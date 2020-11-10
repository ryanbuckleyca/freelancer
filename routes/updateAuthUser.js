const updateAuthUser = (user) => {
  // called from Users 'put' route
  // called also from Users 'create' route

  const axios = require("axios").default;

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

  const updateUserReq = (token) => {
    return ({
      method: 'PATCH',
      url: `https://chequemate.us.auth0.com/api/v2/users/${user.auth0_id}`,
      headers: {'content-type': 'application/json', authorization: `Bearer ${token}`, 'cache-control': 'no-cache'},
      data: {
        user_metadata: { ...user },
        name: user.name,
        picture: user.picture,
      }
    })
  }

  axios.request(tokenRequest)
    .then(res => {
      const token = res.data.access_token;
      axios.request(updateUserReq(token))
      .then(response => response.data)
      .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
}

module.exports = updateAuthUser;
