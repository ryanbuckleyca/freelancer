const updateAuthUser = (user) => {
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
    console.log('token retrieved: ', response.data.access_token);
    const token = response.data.access_token;

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

    return(response.data)
    }).catch(function (error) {
      // updating user has failed
      console.error(error);
    });
  }).catch(function (error) {
    // getting token has failed
    console.error(error);
  });
}

module.exports = updateAuthUser;
