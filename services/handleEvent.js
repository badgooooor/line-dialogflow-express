const line = require('@line/bot-sdk');
const lineConfig = require('../config/lineConfig');
const client = new line.Client(lineConfig);

module.exports = (event) => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: "Not a message"
    })
  } else {
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: event.message.text
    })
  }
}