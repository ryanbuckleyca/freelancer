const axios = require("axios").default

const getAuth0Token = async () => {
  const tokenRequest = {
    method: 'POST',
    url: 'https://chequemate.us.auth0.com/oauth/token',
    headers: {'content-type': 'application/json'},
    data: {
      grant_type: 'client_credentials',
      client_id: process.env.AUTH0_MGMT_API_CLIENT_ID,
      client_secret: process.env.AUTH0_MGMT_API_SECRET,
      audience: process.env.AUTH0_MGMT_API_AUDIENCE
    }
  };
  const token = await axios.request(tokenRequest)
    .then(res => res.data.access_token)
    .catch(error => console.error(error))
    
  return token
}

module.exports = getAuth0Token
