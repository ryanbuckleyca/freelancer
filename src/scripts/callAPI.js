const url = process.env.REACT_APP_API_URL || 'http://localhost:9000';

let json = { 'Content-Type': 'application/json' }
const callAPI = async (address, method = 'GET', params = null, headers = json) => {
  let attrs = {
    method: method,
    headers: headers
  }
  if(['POST', 'PUT', 'PATCH'].includes(method))
    attrs.body = JSON.stringify(params)

  try {
    const res = await fetch(`${url}${address}`, attrs)
    const data = await res.json()
    return data
  } catch(err) {
    // TODO: handle errors
    // returning null leads to unexpected results
    console.log(`callAPI(${address},${method},${params}) error: `, err)
    return null
  }
}

export default callAPI;
