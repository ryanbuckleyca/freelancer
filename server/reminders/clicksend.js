require('dotenv').config();

const clicksendUser = process.env.CLICKSEND_USER
const clicksendPass = process.env.CLICKSEND_PASS
const clicksendKey = process.env.CLICKSEND_KEY
const clicksendNumber = '+61411111111'
const clicksendEmail = 'test2@test.com'
const api = require('./clicksendAPI.js')


var emailTransactionalApi = new api.TransactionalEmailApi(clicksendUser, clicksendKey);

var emailRecipient = new api.EmailRecipient();

emailRecipient.email = clicksendEmail;
emailRecipient.name = "John doe";

var emailFrom = new api.EmailFrom();

emailFrom.emailAddressId = 12137;
emailFrom.name = "john";

var attachment = new api.Attachment();

attachment.content = "ZmlsZSBjb250ZW50cw==";
attachment.type = "text/plain";
attachment.filename = "text.txt";
attachment.disposition = "attachment";
attachment.contentId = "text";

var email = new api.Email();

email.to = [emailRecipient];
email.cc = [emailRecipient];
email.bcc = [emailRecipient];
email.from = emailFrom;
email.subject = "subject";
email.body = "body";
email.attachments = [attachment];

emailTransactionalApi.emailSendPost(email).then(function(response) {
  console.log(response.body);
}).catch(function(err){
  console.error(err.body);
});

//
// // CLICKSEND LETTER
// const letter_cost = (file) => {
//   connect_clicksend
//   api_instance = ClickSendClient::PostLetterApi.new
//   post_letter = ClickSendClient::PostLetter.new(
//     'file_url': upload_file_to_clicksend(file),
//     'colour': 0,
//     'recipients': [
//       {
//         'return_address_id': 0,
//         'schedule': 0,
//         'address_postal_code': 'H2W 1Y7',
//         'address_country': 'Canada',
//         'address_line_1': '4107 St. Laurent Blvd',
//         'address_state': 'Quebec',
//         'address_name': 'Ryan Buckley',
//         'address_line_2': 'Apt 2',
//         'address_city': 'Montreal'
//       }
//     ],
//     'template_used': 0,
//     'duplex': 0,
//     'priority_post': 0,
//     'source': 'sdk'
//   )
//
//   begin
//     result = api_instance.post_letters_price_post(post_letter)
//     JSON.parse(result)
//   rescue ClickSendClient::ApiError => e
//     "Exception when calling PostLetterApi->post_letters_price_post: #{e.response_body}"
//   end
// }
//
// // CLICKSEND UPLOAD DOC
// def upload_file_to_clicksend(file)
//   api_instance = ClickSendClient::UploadApi.new
//
//   # Open the file you wish to encode
//   data = File.open(file).read
//
//   # Encode the puppy
//   encoded = Base64.encode64(data)
//
//   # UploadFile | Your file to be uploaded
//   upload_file = ClickSendClient::UploadFile.new(
//     content: encoded
//   )
//
//   convert = 'post' # String |
//
//   begin
//     # Upload File
//     result = api_instance.uploads_post(upload_file, convert)
//     JSON.parse(result)['data']['_url']
//   rescue ClickSendClient::ApiError => e
//     "Exception when calling UploadApi->uploads_post: #{e.response_body}"
//   end
// end
//
// // CLICKSEND EMAILS
// def emails_fr_clicksend
//   connect_clicksend # only needs to happen once, i think
//   api_instance = ClickSendClient::EmailMarketingApi.new
//   begin
//     result = api_instance.allowed_email_address_get
//     json = JSON.parse(result)
//     verified_emails = json['data']['data'].select do |email|
//       email['verified'] == 1
//     end
//     # TODO: get next email address that user has used
//     # for now, get a random one
//     # returns { "email_address_id"=>12133, "email_address"=>"invoicecollectionsteam@yahoo.com" ... }
//     verified_emails.sample
//   rescue ClickSendClient::ApiError => e
//     "Exception when calling EmailMarketingApi->allowed_email_address_get: #{e.response_body}"
//   end
// end
