<template>
  <div class="container mx-auto p-4 w-full h-full">
    <div class="flex flex-col">
      <go-back />
      <h1 class="text-center text-2xl font-bold my-4">Map</h1>
    </div>
    <div class="flex h-full">
      <div id="map">
        <div id="route-info" class="route-info">
          <!-- Route summary will be displayed here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { initializeMap, visualizePointsFromJson } from '@/utils/map.js'
import GoBack from '@/components/go-back.vue'

import tempData from '@/assets/example.json'
import { useStore } from 'vuex'

const store = useStore()

store.dispatch('getLocation')

onMounted(() => {
  const map = initializeMap('map')
  visualizePointsFromJson(tempData, map)
})
</script>

<style scoped>
#map {
  height: 80vh;
  width: 100vw;
}

.destination-marker {
  color: #000;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  line-height: 14px;
}

.leaflet-routing-container {
  background-color: #f8f9fa;
}

.route-info {
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.leaflet-routing-container .leaflet-routing-itinerary {
  display: none;
}

.leaflet-routing-container .leaflet-routing-alt {
  padding: 10px;
  border: none;
  background: #f8f9fa;  /* Change the background as needed */
}

</style>
