<script setup>
defineProps({
  title: {
    String,
    required: false,
    default: ''
  }
})
</script>

<template>
  <div class="max-w-4xl mx-auto py-4">
    <h2 class="text-lg font-bold mb-4">{{ title }}</h2>
    <hr class="mb-4">
    <ul class="space-y-2">
      <slot />
    </ul>
  </div>
</template>

