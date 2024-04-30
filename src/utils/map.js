import L from 'leaflet'
import 'leaflet-routing-machine'
import 'lrm-graphhopper'
// import 'leaflet-control-geocoder'
import store from '@/store/index.js'
import keyJson from '@/assets/key.json'

const config = {
  zoom: 11,
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors',
  urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  numberedMarkerCSS: 'destination-marker',
  defaultLatLong: [59.9342802, 30.3350986],
  key: keyJson.key
}


export const initializeMap = (id) => {
  // TODO: replace with current GPS coords
  const { lat, long } = store.state.currentLocation
  // const center = lat ? [lat, long] : config.defaultLatLong
  const center = config.defaultLatLong

  const map = L.map(id).setView(center, config.zoom)

  L.tileLayer(config.urlTemplate, {
    maxZoom: config.maxZoom,
    attribution: config.attribution
  }).addTo(map)
  return map
}


// Visualize points from JSON data
export const visualizePointsFromJson = (jsonData, map) => {
  const waypoints = []
  jsonData?.forEach((entry, index) =>
    processJsonEntry(entry, index, map, waypoints)
  )
  routing(map, waypoints)
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


const routing = (map, waypoints) => {
  if (waypoints.length > 1) {
    const control = L.Routing.control({
      waypoints,
      router: new L.Routing.GraphHopper(config.key, {
        urlParameters: {
          vehicle: 'car'
        }
      })
    }).addTo(map)

    L.Routing.itinerary({
      collapsible: true,
      show: false
    }).addTo(map)


    //   control.on('routesfound', function(e) {
  //     const { summary } = e.routes[0]
  //     document.getElementById('route-info').innerHTML = `
  //   <strong>Distance:</strong> ${(summary.totalDistance / 1000).toFixed(2)} km<br>
  //   <strong>Estimated Time:</strong> ${Math.round(summary.totalTime / 60)} min
  // `
  //   })

  }
}
