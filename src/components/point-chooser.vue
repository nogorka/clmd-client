<template>
  <form @submit.prevent
        class="flex items-center my-4 gap-2">
    <input
      type="search"
      v-model="query"
      class="block w-full p-2 mx-auto border-2 border-gray-300 rounded-lg hover:border-blue-500 focus:border-blue-500"
      placeholder="Enter address or coordinates"
    />
    <button
      @click="onSubmit"
      class="flex items-center justify-center px-4 py-2 text-blue-500 rounded-lg border-2 border-blue-500 hover:bg-blue-500 hover:text-white"
    >
      Search
      <i class="pi pi-search ml-2"></i>
    </button>

  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

import { searchPoint } from '@/utils/geocoding.js'
import { UiMessage } from '@/utils/message-helper.js'

const store = useStore()
const query = ref('')

const onSubmit = async () => {
  if (query.value) {
    const point = await searchPoint(query.value)
    console.log(point)
    await store.dispatch('addInputPoint', point)
  } else {
    UiMessage.warning('Empty location query')
  }
}

// TODO: add autocomplete search
</script>
