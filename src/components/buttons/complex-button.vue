<template>
  <div class="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-200 transition">
    <i :class="['pi', props.icon, 'text-xl']"></i>
    <router-link
      :to="props.to"
      class="flex items-center btn"
    >
      <slot />
    </router-link>
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
