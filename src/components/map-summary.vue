<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

const distance = computed(() =>
  (store.state.optimalRoute.length / 1000).toFixed(2)
)

const hours = computed(() =>
  Math.round(store.state.optimalRoute.time / 3600))

const mins = computed(() => {
  return Math.round(store.state.optimalRoute.time / 60) - hours.value * 60
})

</script>

<template>
  <strong>Distance:</strong> {{ distance }} km<br>
  <strong>Estimated Time:</strong> {{ hours }} h {{ mins }} min
</template>
