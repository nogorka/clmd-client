import L from 'leaflet'
import 'leaflet-routing-machine'
import 'lrm-graphhopper'
import 'leaflet.fullscreen'

// import 'leaflet-control-geocoder'
import store from '@/store/index.js'

export const config = {
  zoom: 11,
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors',
  urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  numberedMarkerCSS: 'destination-marker',
  defaultLatLong: [59.9342802, 30.3350986],
  key: import.meta.env.VITE_GRAPH_HOPPER_KEY,
  car: {
    iconUrl: 'car.png',
    iconSize: [30, 30],
    iconAnchor: [30, 30]
  }
}

export const initializeMap = (id) => {
  // TODO: replace with current GPS coords
  const { lat, long } = store.state.currentLocation
  // const center = lat ? [lat, long] : config.defaultLatLong
  const center = config.defaultLatLong

  const map = L.map(id, {
    center,
    zoom: config.zoom,
    fullscreenControl: true
  })

  L.tileLayer(config.urlTemplate, {
    maxZoom: config.maxZoom,
    attribution: config.attribution
  }).addTo(map)
  return map
}

// Visualize points from JSON data
export const visualizePointsFromJson = (jsonData, map, index) => {
  const waypoints = []
  jsonData?.forEach((entry, index) => processJsonEntry(entry, index, map, waypoints))
  routing(map, waypoints, index)
}

// Process each entry from the JSON data
const processJsonEntry = (entry, index, map, waypoints) => {
  const { lat, long } = entry

  waypoints.push(L.latLng(lat, long))

  const numberMarker = numberIconMarker(index + 1)
  L.marker([lat, long], { icon: numberMarker }).addTo(map)
  L.marker([lat, long]).addTo(map)
}

const numberIconMarker = (number) =>
  L.divIcon({
    className: config.numberedMarkerCSS,
    html: number
  })

const router = (key) => new L.Routing.GraphHopper(key, {
  urlParameters: { vehicle: 'car' }
})

const lineStyles = (index) => {
  return [
    { color: 'black', opacity: 0.15, weight: 9 },
    { color: 'white', opacity: 0.8, weight: 6 },
    { color: `hsl(${store.state.mapSettings.colors[index]}, 100%, 50%)`, opacity: 1, weight: 2 }
  ]
}

const routing = (map, waypoints, index) => {
  if (waypoints.length > 1) {
    const control = L.Routing.control({
      waypoints,
      router: router(config.key),
      lineOptions: {
        styles: lineStyles(index)
      }
    }).addTo(map)

    control.on('routesfound', (e) => {
      // TODO: dont forget to update when multiple routes will be available
      const { summary } = e.routes[0]
      store.dispatch('updateRouteMeta', summary)
    })
  }
}
