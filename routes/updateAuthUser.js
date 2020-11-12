const authToken = require('./getAuth0Token');
const axios = require("axios").default;

const updateAuthUser = async (user) => {
  // sends info back to auth0 to update user info there
  // called from Users 'put' route
  // called also from Users 'create' route

  const token = await authToken();
  const options = {
    method: 'PATCH',
    url: `https://chequemate.us.auth0.com/api/v2/users/${user.auth0_id}`,
    headers: {'content-type': 'application/json', authorization: `Bearer ${token}`, 'cache-control': 'no-cache'},
    data: {
      user_metadata: { ...user.dataValues },
      name: user.name,
      picture: user.picture,
    }
  }

  return axios.request(options)
    .then(response => response.data)
    .catch(error => console.error(error));
}

module.exports = updateAuthUser;
