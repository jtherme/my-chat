import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import { ObjectId } from 'mongodb'
import { db, connectToDb} from './db.js'

const app = express();
app.use(express.json());
app.use(mongoSanitize());
app.use(helmet());

// Get user by username
app.get('/api/user/:username', async (req, res) => {
  const { username } = req.params;
  const user = await db.collection('users').findOne({username : username});

  if(user){
    res.json(user);
  }
  else {
    res.status(404).send('User not found!');
  }
});

// Get conversation by id
app.get('/api/conversation/:id', async (req, res) => {
  const { id } = req.params;
  const conversation = await db.collection('conversations').findOne({_id : ObjectId(id)});

  if(conversation){
    res.json(conversation);
  }
  else {
    res.sendStatus(404);
  }
});

// Create conversation (+update corresponding users)
app.post('/api/conversation', async (req, res) => {
  const { title, users } = req.body;

  // Add converation
  const insert = await db.collection('conversations').insertOne({
    title: title,
    users: users,
    messages: [],
  });

  // Update all participating users with new conversation details
  for (const username of users){
    await db.collection('users').updateOne({username : username}, {
      $push: {conversations: {
        conversation_id: insert.insertedId,
        conversation_title: title
      }}
    });
  }
    
  const conversation = await db.collection('conversations').findOne({_id : ObjectId(insert.insertedId)});
  if(conversation){
    res.json(conversation);
  }
  else {
    res.status(400).send('Conversation could not be created');
  }
});

// Add message to conversation
app.post('/api/conversation/:id/message', async (req, res) => {
  const { id } = req.params;
  const { text, sent_by } = req.body;
  if(text && text.length > 0 && sent_by){
    await db.collection('conversations').updateOne({_id : ObjectId(id)}, {
      $push: {messages: {
        text: text,
        sent_by: sent_by,
        sent_at: new Date()
      }}
    });
  }
  
  const conversation = await db.collection('conversations').findOne({_id : ObjectId(id)});
  if(conversation){
    res.json(conversation);
  }
  else {
    res.sendStatus(404);
  }
});

connectToDb(() => {
  console.log('connected to database on port 27017');
  app.listen(8000, () => {
    console.log('server is listening on port 8000');
  });
});