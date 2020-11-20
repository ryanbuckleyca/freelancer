const { twilioAPI } = require('./_api');

const twilioNumber = '+18588793879'
const ryanNumber = '+14384086340'

twilioAPI.calls
  .create({
    twiml: '<Response><Say>Ahoy there!</Say></Response>',
    from: twilioNumber,
    to: ryanNumber
   })
  .then(call => console.log(call))
  .catch(error => console.log('error: ', error))
