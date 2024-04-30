<template>
  <div class="container mx-auto p-4 w-full h-full">
    <div class="flex flex-col">
      <go-back />
      <h1 class="text-center text-2xl font-bold my-4">Map</h1>
    </div>
    <div class="flex h-full" v-loading="store.state.loading">
      <div id="map" />
    </div>
  </div>
</template>

<script setup>
import { onDeactivated, onMounted, ref, watch } from 'vue'
import { initializeMap, visualizePointsFromJson } from '@/utils/map.js'
import GoBack from '@/components/go-back.vue'
import { useStore } from 'vuex'


const store = useStore()
const map = ref(null)


store.dispatch('getLocation')

watch(
  () => store.state.optimalRoute,
  (newRoute) => {
    if (newRoute && map.value) {
      visualizePointsFromJson(newRoute, map.value)
    }
  },
  { immediate: true }
)

onMounted(() => {
  map.value = initializeMap('map')
})

onDeactivated(() => {
  store.dispatch('clearRoute')
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
