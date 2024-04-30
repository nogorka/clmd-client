<script setup>
import { useStore } from 'vuex'

const store = useStore()

const onClick = () => {
  store.dispatch('optimizeRoute')
}
</script>

<template>
  <button
    type="button"
    class="mt-4 w-full border-2 border-blue-500 text-blue-500 py-2 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    @click="onClick"
  >
    Optimize route
    <i class="pi pi-truck ml-2"></i>
  </button>
</template>
