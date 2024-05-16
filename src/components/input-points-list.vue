<script setup>
import { useStore } from 'vuex'

const store = useStore()

</script>

<template>
  <div class="max-w-4xl mx-auto py-4">
    <h2 class="text-md font-bold mb-4">Added input points</h2>
    <hr class="mb-4">
    <ul class="space-y-2">
      <li v-for="point in store.state.inputPoints"
          :key="point.id"
          class="p-4 rounded-lg border-2 border-gray-200 hover:bg-gray-200 transition-colors duration-300"
      >
        <div class="flex justify-between items-center gap-2">
          <div class="flex flex-col items-center">
            <span>ID({{ point.id }}):</span>
            <span>{{ point.lat }}, {{ point.long }}</span>
          </div>
          <span class="text-gray-600">{{ point.adress }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
