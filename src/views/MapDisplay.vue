<template>
  <div class="container mx-auto p-4 w-full h-full">
    <div class="flex flex-col">
      <go-back />
      <h1 class="text-center text-2xl font-bold my-4">Map</h1>
    </div>
    <div class="flex h-full">
      <div id="map"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { initializeMap, visualizePointsFromJson } from '@/utils/map.js'
import GoBack from '@/components/go-back.vue'

import tempData from '../../resources/result-route-example.json'
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
</style>
