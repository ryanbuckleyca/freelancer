const updateAuthUser = (user) => {

  console.log('updateAuthUser called with param user: ', user)
  // get token -- this way doesn't work
  // getting authentication error
  var axios = require("axios").default;

  var options = {
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

  axios.request(options).then(function (response) {
    console.log(response.data);

    // get token

    const token = response.data.access_token || process.env.AUTH0_MGMT_API_TOKEN;

    options = {
      method: 'PATCH',
      url: `https://chequemate.us.auth0.com/api/v2/users/${user.auth0_id}`,
      headers: {'content-type': 'application/json', authorization: `Bearer ${token}`, 'cache-control': 'no-cache'},
      data: {
        name: user.name,
        picture: user.picture,
      }
    };

    axios.request(options).then(function (response) {
    console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }).catch(function (error) {
    console.error(error);
  });
}

module.exports = updateAuthUser;
