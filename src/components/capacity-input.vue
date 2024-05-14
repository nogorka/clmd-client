<script setup>

import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const form = ref({ capacity: store.state.capacity })

const onChange = (event) => {
  console.log(event)
  store.dispatch('updateCapacity', Number(event.target.value))
}
</script>

<template>
  <div class="flex flex-col gap-2 ">
    <label class="flex items-center gap-4">
      <span class="block font-medium text-gray-700">Capacity input</span>
      <input
        v-model.number="form.capacity"
        @change="onChange"
        class="flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>
  </div>
</template>
