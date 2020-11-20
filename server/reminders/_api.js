const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

const clicksendUser = process.env.CLICKSEND_USER
const clicksendPass = process.env.CLICKSEND_PASS
const clicksendKey = process.env.CLICKSEND_KEY
const clicksendAPI = require('clicksend/api.js')
const clicksendLetterAPI = new clicksendAPI.PostLetterApi(clicksendUser, clicksendKey);
const clicksendEmailAPI = new clicksendAPI.TransactionalEmailApi(clicksendUser, clicksendKey);

const twilioSID = process.env.TWILIO_ACCOUNT_SID;
const twilioToken = process.env.TWILIO_AUTH_TOKEN;
const twilioAPI = require('twilio')(twilioSID, twilioToken);

module.exports = {
  clicksendLetterAPI,
  clicksendEmailAPI,
  twilioAPI
}
