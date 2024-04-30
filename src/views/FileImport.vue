<script setup>
import GoBack from '@/components/go-back.vue'
import { processCsv, processJson } from '@/utils/file.js'
import OptimizeRouteButton from '@/components/optimize-route-button.vue'

const onChange = (e) => {
  const file = e.target.files[0]
  if (!file) return

  if (file.type !== 'application/json' && !file.name.endsWith('.csv')) {
    alert('Only JSON or CSV files are allowed!')
    return
  }

  const reader = new FileReader()
  reader.onload = (event) => {
    const content = event.target.result
    if (file.type === 'application/json') {
      processJson(content)
    } else if (file.name.endsWith('.csv')) {
      processCsv(content)
    }
  }

  if (file.type === 'application/json' || file.name.endsWith('.csv')) {
    reader.readAsText(file)
  }
}
</script>

<template>
  <div class="container mx-auto p-4">
    <go-back />
    <div class="max-w-lg mx-auto">
      <h1 class="text-center text-2xl font-bold my-4">File Import</h1>
      <input
        class="block w-full text-center p-2 mx-auto my-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 focus:border-blue-500"
        type="file"
        accept=".json, .csv"
        @change="onChange"
      />

      <optimize-route-button />
    </div>
  </div>
</template>
