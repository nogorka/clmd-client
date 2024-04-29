import L from 'leaflet'
import store from '@/store/index.js'
// import 'leaflet-routing-machine'
// import 'leaflet-control-geocoder'

const config = {
  zoom: 11,
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors',
  urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  numberedMarkerCSS: 'destination-marker',
  defaultLatLong: [59.9342802, 30.3350986]
}

export const initializeMap = (id) => {
  // TODO: replace with current GPS coords
  const { lat, long } = store.state.currentLocation
  const center = lat ? [lat, long] : config.defaultLatLong

  const map = L.map(id).setView(center, config.zoom)

  L.tileLayer(config.urlTemplate, {
    maxZoom: config.maxZoom,
    attribution: config.attribution
  }).addTo(map)
  return map
}

const addNumberToMarker = (number) =>
  L.divIcon({
    className: config.numberedMarkerCSS,
    html: number
  })

// Process each entry from the JSON data
const processJsonEntry = (entry, index, map) => {
  const { lat, long } = entry

  const numberMarker = addNumberToMarker(index + 1)
  L.marker([lat, long], { icon: numberMarker }).addTo(map)
  L.marker([lat, long]).addTo(map)
}

// Visualize points from JSON data
export const visualizePointsFromJson = (jsonData, map) => {
  jsonData?.forEach((entry, index) => processJsonEntry(entry, index, map))
}
