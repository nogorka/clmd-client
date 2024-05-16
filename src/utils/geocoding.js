import { UiMessage } from '@/utils/message-helper.js'

const baseUrl = 'https://nominatim.openstreetmap.org/'

const isCoordinates = (query) => {
  const coordinateRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/
  return coordinateRegex.test(query)
}

const processUrl = (queryString) => {
  if (!queryString) return null

  const query = encodeURIComponent(queryString.trim())
  const params = new URLSearchParams({ format: 'json' })
  let url

  if (isCoordinates(queryString)) {
    url = new URL('reverse', baseUrl)
    const [lat, lon] = queryString.split(',')
    params.append('lat', lat)
    params.append('lon', lon)
  } else {
    url = new URL('search', baseUrl)
    params.append('q', query)
    params.append('limit', 1)
  }
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
