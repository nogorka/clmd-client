<template>
  <div class="container mx-auto p-4 w-full h-full">
    <div class="flex flex-col">
      <go-back />
    </div>

    <round-button
      position="bottom-4 right-4"
      icon-class="pi pi-cog"
      @clickCallback="changeMapSummaryVisibility(true)"
    />
    <map-summary />

    <geolocation-button />

    <div class="flex h-full">
      <div id="map" />
    </div>
  </div>
</template>

<script setup>
import { onDeactivated, onMounted, provide, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import { clearMap, initializeMap, visualizePointsFromJson } from '@/utils/map.js'
import GoBack from '@/components/go-back.vue'
import MapSummary from '@/components/map-summary.vue'
import GeolocationButton from '@/components/geolocation-button.vue'
import RoundButton from '@/components/round-button.vue'

const store = useStore()
const route = useRoute()

const map = ref(null)
const mapSummaryVisible = ref(false)
provide('map', map)

provide('mapSummaryVisible', mapSummaryVisible)

const changeMapSummaryVisibility = (value) => {
  mapSummaryVisible.value = value
}

store.dispatch('getLocation')

const routeControls = ref([])
const markersAll = ref([])
watch(
  () => store.state.mapSettings.visibility,
  (visibility) => {
    if (visibility && map.value) {
      clearMap(map.value, routeControls.value, markersAll.value)

      for (const index in visibility) {
        if (store.state.mapSettings.visibility[index]) {
          const { control, markers } = visualizePointsFromJson(store.state.optimalRoute.route[index], map.value, index)
          routeControls.value.push(control)
          markersAll.value.push(...markers)
        }
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
})

onDeactivated(() => {
  store.dispatch('clearOptimalRoute')
  store.dispatch('clearMapSetting')
})
</script>

<style scoped>
#map {
  height: 90vh;
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
