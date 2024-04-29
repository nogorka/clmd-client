<template>
  <div class="flex gap-2">
    <span :class="props.icon"></span>
    <router-link :to="props.to" class="btn"> <slot /></router-link>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  to: {
    type: String,
    default: '/'
  }
})
</script>
