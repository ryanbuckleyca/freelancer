const { twilioAPI } = require('./_api');

const twilioNumber = '+18588793879'
const ryanNumber = '+14384086340'

const date = new Date()

twilioAPI.messages
  .create({
    body: `Today is ${date}`,
    from: twilioNumber,
    to: ryanNumber
  })
  .then(message => console.log(message))
  .catch(error => console.log('error: ', error))
