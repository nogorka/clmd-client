<script setup>
import { useStore } from 'vuex'
import { computed, inject } from 'vue'
import { useWindowSize } from '@vueuse/core'

const store = useStore()
const mapSummaryVisible = inject('mapSummaryVisible')

const distance = (value) => (value / 1000).toFixed(2)

const hours = (value) => Math.trunc(value / 3600)

const mins = (value) => {
  return Math.round(value / 60) - hours(value) * 60
}


const routeMetaData = computed(() => store.getters.getRouteMetaData)

const { width } = useWindowSize()
const drawerSize = computed(() => width.value < 400 ? '100%' : '40%')

const onCheckboxChange = (event) => {
  const payload = { index: Number(event.target.value), newValue: event.target.checked }
  store.dispatch('updateRouteVisibility', payload)
}

</script>

<template>
  <el-drawer v-model="mapSummaryVisible" direction="rtl" :size="drawerSize">
    <span class="block text-2xl font-bold py-6">Select route</span>
    <ul class="flex flex-col gap-8">
      <li v-for="entry in routeMetaData"
          class="flex flex-col gap-2"
      >
        <div class="flex gap-2">
          <input
            type="checkbox" class="min-w-[20px] min-h-[20px]"
            :value="entry.index"
            v-model="entry.visibility"
            @change="onCheckboxChange">
          <span class="rounded block w-[20px] h-[20px]"
                :style="`background-color: hsl(${entry.hue}, 100%, 50%)`"></span>
          <span>Route {{ entry.index }} - size {{ entry.route.length }}</span>
        </div>
        <span>Time: {{ hours(entry.summary.totalTime) }}h {{ mins(entry.summary.totalTime) }}m</span>
        <span>Distance: {{ distance(entry.summary.totalDistance) }}km</span>
      </li>
    </ul>
  </el-drawer>
</template>
