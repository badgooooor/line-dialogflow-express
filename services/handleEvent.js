const request = require('request-promise');
const line = require('@line/bot-sdk');
const lineConfig = require('../config/lineConfig');
const client = new line.Client(lineConfig);

const postToDialogflow = (req) => {
  req.headers.host = "bots.dialogflow.com";
  return request.post({
    uri: `https://bots.dialogflow.com/line/${process.env.DIALOGFLOW_AGENT_ID}/webhook`,
    headers: req.headers,
    body: JSON.stringify(req.body)
  });
}

module.exports = (req, res) => {
  Promise
    .all(req.body.events.map((event) => {
      if (event.type !== 'message' || event.message.type !== 'text') {
        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: "Not a message"
        })
      } else {
        return postToDialogflow(req);
      }
    }))
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
  return res.status(200);
}