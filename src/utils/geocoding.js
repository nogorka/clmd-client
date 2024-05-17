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

  const query = queryString.trim()
  const params = new URLSearchParams(
    { format: 'jsonv2', countrycodes: 'ru', 'accept-language': 'ru-RU' }
  )
  let endpoint

  if (isCoordinates(query)) {
    endpoint = 'reverse'
    const [lat, lon] = query.split(',')
    setURLSearchParamsObject(params, { lat: lat.trim(), lon: lon.trim() })
  } else {
    endpoint = 'search'
    setURLSearchParamsObject(params, { 'q': query, 'limit': 1 })
  }

  const url = new URL(endpoint, baseUrl)
  url.search = params.toString()

  return url
}

export const fetchLocationData = async (url) => {
  try {
    if (url) {

      const response = await fetch(url)
      const data = await response.json()

      if (data && data.error) {
        UiMessage.error(data.error)
        return null
      }

      if (data && data.length && data[0].osm_id) return data[0]
      else if (data && data.osm_id) return data
      else {
        UiMessage.error('No location data found')
        return null
      }
    }
  } catch (error) {
    UiMessage.error('Error fetching location data')
    return null
  }
}


export const searchPoint = async (query) => {
  const url = processUrl(query)
  const pointData = await fetchLocationData(url)

    // TODO: ask for capacity for each input point
  if (pointData && pointData.osm_id) {
    return {
      id: pointData.osm_id,
      long: pointData.lon,
      adress: pointData.display_name || pointData.name || pointData.address,
      lat: pointData.lat,
      purpose: '',
      type: '',
      free_volume: 0,
      total_volume: 0
    }
  }
  return null
}
