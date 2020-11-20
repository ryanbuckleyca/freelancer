const { clicksendEmailAPI } = require('./_api');

const clicksendEmail = 'test2@test.com'

// SEND EMAIL
const emailRecipient = {
  email: clicksendEmail,
  name: "John doe"
}
const emailFrom = {
  emailAddressId: 12137,
  name: "john"
}
const attachment = {
  content: "ZmlsZSBjb250ZW50cw==",
  type: "text/plain",
  filename: "text.txt",
  disposition: "attachment",
  contentId: "text"
}
const email = {
  to: [emailRecipient],
  cc: [emailRecipient],
  bcc: [emailRecipient],
  from: emailFrom,
  subject: "subject",
  body: "body",
  attachments: [attachment]
}

clicksendEmailAPI.emailSendPost(email)
  .then(res => console.log('send email res:', res.body.response_msg))
  .catch(err => console.error('send email err:', err.body));
