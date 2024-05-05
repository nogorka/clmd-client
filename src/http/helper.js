const get_base_url = () => {
  let protocol = 'https'
  if (import.meta.env.DEV) protocol = 'http'

  return `${protocol}://${import.meta.env.VITE_APP_HOST}:${import.meta.env.VITE_APP_PORT}/`
}

const post = async (endpoint, body) => {
  const url = get_base_url() + endpoint
  const data = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  if (data.status === 200) {
    const result = await data.json()
    return { 'success': true, data: result }
  } else {
    return { 'success': false }
  }
}

const get = async (endpoint, paramsObj) => {
  const params = new URLSearchParams(paramsObj)
  const url = new URL(endpoint, get_base_url())
  url.search = params.toString();

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (data.status === 200) {
    const result = await data.json()
    return { 'success': true, data: result }
  } else {
    return { 'success': false }
  }
}

const api = {
  optimizeRoute: async (body) =>
    await post('optimize', body),
  getOptimalRoute: async (id) =>
    await get('route', { id })
}

export default api

