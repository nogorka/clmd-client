<template>
  <round-button
    position="bottom-16 right-4"
    icon-class="pi pi-car"
    @clickCallback="toggleGeolocation"
  />
</template>

<script setup>
import { inject, ref } from 'vue'
import { config } from '@/utils/map.js'
import RoundButton from '@/components/buttons/round-button.vue'

const map = inject('map')

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
        }).addTo(map.value)
      } else {
        currentLocationMarker.value.setLatLng(newLocation)
      }
      map.value.panTo(newLocation)
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
    currentLocationMarker.value && map.value.removeLayer(currentLocationMarker.value)
    currentLocationMarker.value = null
    watchingGeolocation.value = false
  } else {
    watchUserGeolocation()
    watchingGeolocation.value = true
  }
}
</script>
