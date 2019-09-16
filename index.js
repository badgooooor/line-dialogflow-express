const express = require('express');
const LineMiddleware = require('@line/bot-sdk').middleware;

require('dotenv').config();
const lineConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/webhook', LineMiddleware(lineConfig), (req, res) => {
  console.log(req.body);
  res.json({});
});

app.get('/health', (req, res) => {
  res.status(200);
});

app.listen(process.env.PORT, () => {
  console.log(`Running line webhook at port ${process.env.PORT}`)
})