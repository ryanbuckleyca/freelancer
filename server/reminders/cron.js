require('dotenv').config();

const twilioSID = process.env.TWILIO_ACCOUNT_SID;
const twilioToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(twilioSID, twilioToken);
const twilioNumber = '+18588793879'
const ryanNumber = '+14384086340'

const date = new Date()


twilio.messages
  .create({
    body: `Today is ${date}`,
    from: twilioNumber,
    to: ryanNumber
  })
  .then(message => console.log(message))
  .catch(error => console.log('error: ', error))

twilio.calls
  .create({
    twiml: '<Response><Say>Ahoy there!</Say></Response>',
    from: twilioNumber,
    to: ryanNumber
   })
  .then(call => console.log(call));
  .catch(error => console.log('error: ', error))
