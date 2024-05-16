<template>
  <li class="p-4 rounded-lg border-2 border-gray-200 hover:bg-gray-200 transition-colors duration-300">
    <div class="flex justify-between items-center gap-2">
      <div class="flex flex-col items-center">
        <span>ID({{ point.id }}):</span>
        <span>{{ trimCoord(point.lat) }}, {{ trimCoord(point.long) }}</span>
      </div>
      <span class="text-gray-600">{{ point.adress }}</span>
    </div>
  </li>
</template>

<script setup>
defineProps({
  point: {
    type: Object,
    required: true,
    default: null
  }
})

const trimCoord = value => Number(value).toFixed(4)
</script>
