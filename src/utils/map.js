import L from 'leaflet'
// import 'leaflet-routing-machine'
// import 'leaflet-control-geocoder'

// Initialize the map with a base layer
export const initializeMap = () => {
  const map = L.map('map')
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)
  return map
}
