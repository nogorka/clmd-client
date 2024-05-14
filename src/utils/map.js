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
    iconUrl: '/img/car.png',
    iconSize: [30, 30],
    iconAnchor: [30, 30]
  }
}

const fixMarkerIcons = () => {
  delete L.Icon.Default.prototype._getIconUrl

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@latest/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@latest/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@latest/dist/images/marker-shadow.png'
  })
}

export const initializeMap = (id) => {
  fixMarkerIcons()

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
export const visualizePointsFromJson = (jsonData, map, _index) => {
  const markers = []
  const waypoints = jsonData?.map((entry, index) => {
    const { lat, long } = entry
    const marker = L.marker([lat, long], { icon: numberIconMarker(index + 1) }).addTo(map)
    markers.push(marker)
    return L.latLng(lat, long)
  })

  const control = routing(map, waypoints, Number(_index))
  return { control, markers }
}

const numberIconMarker = (number) =>
  L.divIcon({
    className: config.numberedMarkerCSS,
    html: number
  })

// const router = (key) => new L.Routing.GraphHopper(key, {
//   urlParameters: { vehicle: 'car' }
// })

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
      // router: router(config.key),
      lineOptions: {
        styles: lineStyles(index)
      }
    }).addTo(map)

    control.on('routesfound', (e) => {
      const { summary } = e.routes[0]
      summary.index = index
      store.dispatch('updateRouteMeta', summary)
    })
    return control
  }
}

export const clearMap = (map, controls, markers) => {
  controls.forEach(control => {
    map.removeControl(control)
  })
  markers.forEach((marker) => {
    map.removeLayer(marker)
  })
  map.eachLayer((layer) => {
    if (layer.options.waypoints) {
      map.removeLayer(layer)
    }
  })
}
