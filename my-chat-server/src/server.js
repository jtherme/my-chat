import express from 'express';
import { ObjectId } from 'mongodb'
import { db, connectToDb} from './db.js'

const app = express();
app.use(express.json());

// Get user by id
app.get('/api/user/:username', async (req, res) => {
  const { username } = req.params;
  const user = await db.collection('users').findOne({username : username});

  if(user){
    res.json(user);
  }
  else {
    res.sendStatus(404);
  }
});

// Create conversation
app.post('/api/conversation', async (req, res) => {
  const { title, users } = req.body;
  const insert = await db.collection('conversations').insertOne({
    title: title,
    users: users,
    messages: [],
  });
  const conversation = await db.collection('conversations').findOne({_id : ObjectId(insert.insertedId)});

  if(conversation){
    res.json(conversation);
  }
  else {
    res.sendStatus(404);
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

// Add message to conversation
app.post('/api/conversation/:id/message', async (req, res) => {
  const { id } = req.params;
  const { text, sender } = req.body;
  await db.collection('conversations').updateOne({_id : ObjectId(id)}, {
    $push: {messages: {
      text: text,
      sender: sender,
      sentAt: new Date()
    }}
  });
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