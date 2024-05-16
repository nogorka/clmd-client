<script setup>
import GoBack from '@/components/go-back.vue'
import OptimizeRouteButton from '@/components/optimize-route-button.vue'
import CapacityInput from '@/components/capacity-input.vue'
import InputPointsList from '@/components/input-points-list.vue'
import { onMounted } from 'vue'
import { initializeMap } from '@/utils/map.js'

onMounted(() => {
  map.value = initializeMap('map')
})
</script>

<template>
  <div class="container mx-auto p-4 w-full h-full">
    <div class="flex flex-col">
      <go-back />
    </div>

    <h1 class="text-center text-2xl font-bold my-4">Manually input points</h1>

    <div class="flex h-[450px] w-full">
      <div id="map" />
    </div>

    <input-points-list />

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
