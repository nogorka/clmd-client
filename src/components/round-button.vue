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
  `${props.position} fixed bg-blue-500 text-white p-2 rounded-full shadow-lg z-[9999] min-w-10 min-h-10`)

</script>
