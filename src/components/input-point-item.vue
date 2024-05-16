<template>
  <div class="flex justify-between items-center gap-2">
    <div class="flex flex-col items-center">
      <span>ID({{ point.id }}):</span>
      <span>{{ trimCoord(point.lat) }}, {{ trimCoord(point.long) }}</span>
    </div>
    <span class="text-gray-600">{{ point.adress }}</span>
  </div>
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
