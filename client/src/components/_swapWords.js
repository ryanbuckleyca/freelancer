const faker = require('faker')

const words = {
  subject: ['Touching base', 'Checking in', 'Gentle reminder', 'Overdue notice', 'Action required', 'Invoice payment pending', 'Please follow up', 'Just a friendly reminder', 'Hope things are fine'],
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

let loop;
let i = 1

export const swapWords = function() {
  for (var key in words) {
    let firstName = faker.name.firstName()
    let lastName = faker.name.lastName()
    let email = faker.internet.email(firstName, lastName)
    let now = new Date();
    now.setDate(now.getDate() + i * 7);

    const rando = Math.floor(Math.random() * words[key].length)
    document.getElementsByName(key)[0].innerText = words[key][rando];
    document.getElementsByName('fakerName')[0].innerText = `${firstName} ${lastName}`;
    document.getElementsByName('fakerEmail')[0].innerText = email;
    document.getElementsByName('date')[0].innerText = now.toISOString().substring(0, 10);
    document.getElementsByName('time')[0].innerText = (i + 1) + ' weeks';
  }
  i++;
  loop = setTimeout(swapWords, 4000);
}

export const stopSwapWords = function() {
  clearTimeout(loop)
}
