const express = require('express');
const LineMiddleware = require('@line/bot-sdk').middleware;
const handleEvent = require('./services/handleEvent');

require('dotenv').config();
const lineConfig = require('./config/lineConfig');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/webhook', LineMiddleware(lineConfig), (req, res) => {
  console.log(req.body);
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

app.get('/health', (req, res) => {
  res.status(200);
});

app.listen(process.env.PORT, () => {
  console.log(`Running line webhook at port ${process.env.PORT}`)
})