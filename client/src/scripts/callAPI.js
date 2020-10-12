const url = process.env.REACT_APP_API_URL || 'http://localhost:9000';

const callAPI = async (method, address, params) => {
  try {
    const res = await fetch(`${url}${address}`, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    })
    const data = await res.json()
    return data
  } catch(err) {
    console.log(`callAPI(${method},${address},${params}) error: `, err)
  }
}

export default callAPI;
