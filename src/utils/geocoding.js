import { UiMessage } from '@/utils/message-helper.js'

const baseUrl = 'https://nominatim.openstreetmap.org/'

const isCoordinates = (query) => {
  const coordinateRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/
  return coordinateRegex.test(query)
}

const setURLSearchParamsObject = (params, obj) => Object.entries(obj).forEach(
  ([key, value]) => {
    params.append(key, value)
  }
)

const processUrl = (queryString) => {
  if (!queryString) return null
  console.log(queryString)
  const query = encodeURIComponent(queryString.trim())
  const params = new URLSearchParams({ format: 'json' })
  let endpoint = ''

  if (isCoordinates(queryString)) {
    endpoint = 'reverse'
    const [lat, lon] = queryString.split(',')
    setURLSearchParamsObject(params, { lat, lon })
  } else {
    endpoint = 'search'
    setURLSearchParamsObject(params, { 'q': query, 'limit': 1 })
  }

  const url = new URL(endpoint, baseUrl)
  url.search = params.toString()

  return url
}

export const fetchLocationData = async (query) => {
  const url = processUrl(query)

  try {
    if (url) {
      const response = await fetch(url)
      const data = await response.json()
      if (data.osm_id) {
        return data
      } else {
        UiMessage.error('No location data found')
      }
    }
  } catch (error) {
    UiMessage.error('Error fetching location data')
  }
}
