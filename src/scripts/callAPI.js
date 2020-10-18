const url = process.env.REACT_APP_API_URL || 'http://localhost:9000';

const callAPI = async (address, method = 'GET', params = null) => {
  console.log('callAPI called')
  let attrs = {
    method: method,
    headers: { 'Content-Type': 'application/json' }
  }
  if(['POST', 'PUT', 'PATCH'].includes(method)) {
    attrs.body = JSON.stringify(params)
  }

  try {
    const res = await fetch(`${url}${address}`, attrs)
    const data = await res.json()
    console.log('callAPI will return: ', data)
    return data
  } catch(err) {
    console.log(`callAPI(${method},${address},${params}) error: `, err)
    return null
  }
}

export default callAPI;
