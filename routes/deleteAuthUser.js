const authToken = require('./getAuth0Token');
const axios = require("axios").default;

const deleteAuthUser = async (auth0_id) => {
  // sends info back to auth0 to delete user there
  // called from Users 'delete' route

  const token = await authToken();
  const options = {
    method: 'DELETE',
    url: `https://chequemate.us.auth0.com/api/v2/users/${auth0_id}`,
    headers: {'content-type': 'application/json', authorization: `Bearer ${token}`, 'cache-control': 'no-cache'},
  }

  return axios.request(options)
    .then(res => res.data)
    .catch(error => console.error(error));
}

module.exports = deleteAuthUser;
