<template>
  <button @click="toggleGeolocation"
          class="fixed bottom-16 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg z-[9999] min-w-10 min-h-10">
   <i class="pi pi-car" ></i>
  </button>
</template>

<script setup>
import { ref } from 'vue'
import { config } from '@/utils/map.js'

const props = defineProps({
  map: {
    type: Object || null,
    required: true,
    default: () => {    }
  }
})

const currentLocationMarker = ref(null)
const watchingGeolocation = ref(false)
let watchId = null

const watchUserGeolocation = () => {
  watchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords
      const newLocation = L.latLng(latitude, longitude)
      if (!currentLocationMarker.value) {
        currentLocationMarker.value = L.marker(newLocation, {
          icon: L.icon(config.car)
        }).addTo(props.map)
      } else {
        currentLocationMarker.value.setLatLng(newLocation)
      }
      props.map.panTo(newLocation)
    },
    (error) => {
      console.error(error)
    },
    {
      enableHighAccuracy: true
    }
  )
}

const toggleGeolocation = () => {
  if (watchingGeolocation.value) {
    navigator.geolocation.clearWatch(watchId)
    currentLocationMarker.value && props.map.removeLayer(currentLocationMarker.value)
    currentLocationMarker.value = null
    watchingGeolocation.value = false
  } else {
    watchUserGeolocation()
    watchingGeolocation.value = true
  }
}
</script>
