<script setup>
import { useStore } from 'vuex'
import { computed, inject } from 'vue'

const store = useStore()
const mapSummaryVisible = inject('mapSummaryVisible')

const distance = computed(() => (store.state.optimalRoute.length / 1000).toFixed(2))

const hours = computed(() => Math.round(store.state.optimalRoute.time / 3600))

const mins = computed(() => {
  return Math.round(store.state.optimalRoute.time / 60) - hours.value * 60
})
</script>

<template>
  <el-drawer v-model="mapSummaryVisible" direction="btt">
    <p>Select routes:</p>
    <li v-for="route in store.state.optimalRoute.route">
      Route with size of {{ route.length }}
    </li>
    <strong>Distance:</strong> {{ distance }} km<br />
    <strong>Estimated Time:</strong> {{ hours }} h {{ mins }} min
  </el-drawer>
</template>
