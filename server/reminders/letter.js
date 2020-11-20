const { clicksendLetterAPI } = require('./_api');

// CLICKSEND LETTER COST

const recipient = {
  returnAddressId: 0,
  addressPostalCode: 'H2W 1Y7',
  addressCountry: 'Canada',
  addressLine_1: '4107 St. Laurent Blvd',
  addressState: 'Quebec',
  addressName: 'Ryan Buckley',
  addressLine_2: 'Apt 2',
  addressCity: 'Montreal'
}
const postLetter = {
  fileUrl: "https://res.cloudinary.com/ryanbuckleyca/raw/upload/v1603583588/cheque-mate/invoices/rkcqlys2plflsgepupfy.pdf",
  priorityPost: 0,
  recipients: [recipient],
  templateUsed: 0,
  duplex: 0,
  colour: 0,
  source: "sdk"
}

clicksendLetterAPI.postLettersPricePost(postLetter)
  .then(res => console.log('price letter res:', res.body.response_msg))
  .catch(err => console.error('price letter err:', err.body));
clicksendLetterAPI.postLettersSendPost(postLetter)
  .then(res => console.log('send letter res:', res.body.response_msg))
  .catch(err => console.error('send letter err:', err.body));
