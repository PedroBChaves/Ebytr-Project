const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).send('entrou');
});
app.use(routes.tasks);

module.exports = app;
