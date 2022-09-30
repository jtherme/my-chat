import express from 'express';

const app = express();
app.use(express.json());

app.post('/hello', (req, res) => {
  const name =  req.body.name;
  res.send(`Hello ${name}!`);
});

app.listen(8000, () => {
  console.log('server is listening on port 8000');
});