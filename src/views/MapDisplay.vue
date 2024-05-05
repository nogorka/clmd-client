<template>
  <div class="container mx-auto p-4 w-full h-full">
    <div class="flex flex-col">
      <go-back />
      <h1 class="text-center text-2xl font-bold my-4">Map</h1>
    </div>

    <button class="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg"
            @click="changeMapSummaryVisibility(true)">
      <i class="pi pi-wrench" />
    </button>
    <map-summary />

    <div class="flex h-full">
      <div id="map" />
    </div>
  </div>
</template>

<script setup>
import { onDeactivated, onMounted, provide, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import { config, initializeMap, visualizePointsFromJson } from '@/utils/map.js'
import GoBack from '@/components/go-back.vue'
import MapSummary from '@/components/map-summary.vue'

const store = useStore()
const route = useRoute()
const map = ref(null)
const currentLocationMarker = ref(null)
const mapSummaryVisible = ref(false)

provide('mapSummaryVisible', mapSummaryVisible)

const changeMapSummaryVisibility = (value) => {
  mapSummaryVisible.value = value
}

store.dispatch('getLocation')

watch(
  () => store.state.optimalRoute.route,
  (newRoute) => {
    if (newRoute && map.value) {
      for (const index in newRoute) {
        visualizePointsFromJson(newRoute[index], map.value, index)
      }
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (!store.state.optimalRoute.route.id && route.params.id) {
    store.dispatch('getOptimalRoute', { id: route.params.id })
  }
  map.value = initializeMap('map')

  if (navigator.geolocation) {
    watchUserGeolocation()
  }
})

const watchUserGeolocation = () => navigator.geolocation.watchPosition(
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

onDeactivated(() => {
  store.dispatch('clearOptimalRoute')
})
</script>

<style scoped>
#map {
  height: 500px;
  width: 100vw;
}

.destination-marker {
  color: #000;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  line-height: 14px;
}

:deep(.leaflet-routing-container) {
  display: none !important;
}
</style>
