<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

import { initializeMap } from '@/utils/map.js'

import GoBack from '@/components/go-back.vue'
import OptimizeRouteButton from '@/components/optimize-route-button.vue'
import CapacityInput from '@/components/capacity-input.vue'
import PointChooser from '@/components/point-chooser.vue'
import ListContainer from '@/components/list-container.vue'
import InputPointItem from '@/components/input-point-item.vue'

const store = useStore()

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
    <point-chooser />
    <div class="flex h-[450px] w-full">
      <div id="map" />
    </div>

    <list-container title="Added input points">
      <li v-for="point in store.state.inputPoints" :key="point.id"
          class="p-4 rounded-lg border-2 border-gray-200 hover:bg-gray-200 transition-colors duration-300"
      >
        <input-point-item :point="point" />
      </li>
    </list-container>

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
