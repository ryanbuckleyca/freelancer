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
    // TODO: change routes to handle null responses from db calls
    const res = await fetch(`${url}${address}`, attrs)
    const data = await res.text()
    if(!data)
      throw('no results')
    return JSON.parse(data)
  } catch(err) {
    // TODO: handle errors
    // returning null leads to unexpected results
    console.log(`callAPI(${address},${method},${params}) error: `, err)
    return null
  }
}

export default callAPI;
