const updateAuthUser = (user) => {
  var options = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: `{"client_id": "${process.env.REACT_APP_AUTH0_MGMT_API_CLIENT_ID}", "client_secret": "${process.env.REACT_APP_AUTH0_MGMT_API_SECRET}", "audience": "${process.env.REACT_APP_AUTH0_MGMT_API_AUDIENCE}", "grant_type": "client_credentials"}`
  };
  fetch('https://chequemate.us.auth0.com/oauth/token', options)
  .then(res => res.json())
  .then(data => {
    const token = data.access_token
    var options = {
      method: 'PATCH',
      headers: {'content-type': 'application/json', authorization: `Bearer ${token}`, 'cache-control': 'no-cache'},
      body: { "name": user.name, "picture": user.picture }
    };
    fetch(`https://chequemate.us.auth0.com/api/v2/users/${user.auth0_id}`, options)
    .then(res => {
      console.log('updateAuthUser result: ', res)
      return res
    })
  })
}

module.exports = updateAuthUser;
