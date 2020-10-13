const url = process.env.REACT_APP_API_URL || 'http://localhost:9000';

const callAPI = async (address, method = 'GET', params = null) => {
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
    return data
  } catch(err) {
    console.log(`callAPI(${method},${address},${params}) error: `, err)
  }
}

export default callAPI;
