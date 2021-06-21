import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.send('Rota GET!');
});

app.post('/', (req, res) => {
  return res.send('Rota POST!');
});

app.listen(3000, () => console.log('Server is running.'));
