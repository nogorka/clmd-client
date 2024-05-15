<template>
  <button @click="emits('clickCallback')" :class="buttonClasses">
    <i :class="iconClass"></i>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  iconClass: {
    type: String,
    required: true,
    default: 'pi pi-cog'
  },
  position: {
    type: String,
    required: true,
    default: 'bottom-16 right-4'
  }
})

const emits = defineEmits(['clickCallback'])

const buttonClasses = computed(() =>
  `${props.position} fixed bg-blue-500 text-white p-4 rounded-full shadow-lg z-[9999] flex items-center justify-center w-12 h-12`
)
</script>
