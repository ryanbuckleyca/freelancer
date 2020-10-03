console.log('swapWords.js loading...')

const faker = require('faker')

const words = {
  greeting: ['Hello', 'Dear', 'Hi', 'Greetings'],
  opening: ['On behalf of', 'In the interest of', 'In support of', 'Regarding the account of', 'With respect to', 'With regards to', 'In representing'],
  who: ['our client', 'the freelancer you hired', 'someone who worked for you recently', ' a former employee of yours', 'a contractor who did work for you'],
  action: ['writing', 'reaching out', 'contacting you', 'sending you this note'],
  inform: ['inform you', 'let you know', 'alert you to the fact that', 'remind you that'],
  invoice: ['invoice', 'bill', 'statement', 'request for payment'],
  sent: ['delivered', 'sent', 'given to you', 'handed over', 'provided'],
  respond: ['get in touch', 'reach out', 'drop a line', 'call or write'],
  contact: ['contact information', 'client info', 'phone or email'],
  attachment: ['following attachment', 'attached pdf', 'included file', 'following pdf'],
  need: ['would like', 'need', 'want'],
  help: ['to discuss options', 'additional information', 'assistance', 'to chat'],
  thanks: ['Thank you', 'Thanks', 'Best wishes', 'Kindly']
}
const swapWords = function() {
  for (var key in words) {
    const rando = Math.floor(Math.random() * words[key].length)
    document.getElementsByName(key)[0].innerText = words[key][rando];
    document.getElementsByName('fakerName')[0].innerText = faker.name.findName();
  }
  setTimeout(swapWords, 4000);
}

export default swapWords;
