<script setup>
import GoBack from '@/components/go-back.vue'
import CodeScanner from '@/components/code-scanner.vue'
import OptimizeRouteButton from '@/components/buttons/optimize-route-button.vue'
import CapacityInput from '@/components/capacity-input.vue'
import InputPointList from '@/components/lists/input-point-list.vue'

</script>

<template>
  <div class="container mx-auto p-4">
    <go-back />

    <h1 class="text-center text-2xl font-bold my-4">Scan QR Code</h1>
    <code-scanner />

   <input-point-list />

    <div>
      <h1 class="text-center text-2xl font-bold my-4">Input vehicles capacity</h1>
      <capacity-input />
    </div>
    <optimize-route-button />
  </div>
</template>
