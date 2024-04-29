<template>
  <div class="flex flex-col w-full h-full justify-center">
    <div class="container mx-auto p-4">
      <go-back />
      <h1 class="text-center text-2xl font-bold my-4">Map</h1>
    </div>
    <div class="flex h-full w-full">
      <div id="map" ref="mapContainer"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { initializeMap } from '@/utils/map.js'
import GoBack from '@/components/go-back.vue'

// import tempData from '@/assets/result-route-example.json'

const mapContainer = ref(null)

onMounted(() => {
  const map = initializeMap()
  //
  // // Example: Adding a marker for a specific location
  // L.marker([59.9342802, 30.3350986])
  //   .addTo(map)
  //   .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
  //   .openPopup()
})
</script>

<style scoped>

#map {
  @media (width >= 1250px) {
    height: 80vh;
    width: 90vw;
  }
  @media (width< 1250px) {
    height: 100vh;
    width: 100vw;
  }
}

.destination-marker {
  color: #000;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  line-height: 14px;
}
</style>
