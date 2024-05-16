<script setup>
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

import { changeFocus, clearMap, initializeMap, visualizeInputPoints } from '@/utils/map.js'

import GoBack from '@/components/go-back.vue'
import OptimizeRouteButton from '@/components/buttons/optimize-route-button.vue'
import CapacityInput from '@/components/capacity-input.vue'
import PointChooser from '@/components/point-chooser.vue'
import InputPointList from '@/components/lists/input-point-list.vue'

const map = ref(null)
const store = useStore()

onMounted(() => {
  map.value = initializeMap('map')

  updateMarkers(store.state.inputPoints)
})

const updateMarkers = (inputPoints) => {
  // TODO: add map point drawing
  if (inputPoints && inputPoints.length > 0 && map.value) {
    clearMap(map.value, null, markersAll.value)

    const { markers, lastMarker } = visualizeInputPoints(store.state.inputPoints, map.value)
    markersAll.value = [...markers]
    changeFocus(lastMarker, map.value)
  }
}

const markersAll = ref([])
watch(
  () => store.state.inputPoints,
  (inputPoints) => updateMarkers(inputPoints),
  { immediate: true, deep: true }
)
</script>

<template>
  <div class="container mx-auto p-4 w-full h-full">
    <div class="flex flex-col">
      <go-back />
    </div>

    <h1 class="text-center text-2xl font-bold my-4">Manually input points</h1>
    <point-chooser />
    <div class="flex h-[450px] w-full">
      <div id="map" />
    </div>

    <input-point-list />

    <div>
      <h1 class="text-center text-2xl font-bold my-4">Input vehicles capacity</h1>
      <capacity-input />
    </div>
    <optimize-route-button />
  </div>
</template>

<style scoped>
#map {
  width: 100vw;
}
</style>
