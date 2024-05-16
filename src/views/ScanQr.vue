<script setup>
import { useStore } from 'vuex'

import GoBack from '@/components/go-back.vue'
import CodeScanner from '@/components/code-scanner.vue'
import OptimizeRouteButton from '@/components/optimize-route-button.vue'
import CapacityInput from '@/components/capacity-input.vue'
import ListContainer from '@/components/list-container.vue'
import InputPointItem from '@/components/input-point-item.vue'

const store = useStore()
</script>

<template>
  <div class="container mx-auto p-4">
    <go-back />

    <h1 class="text-center text-2xl font-bold my-4">Scan QR Code</h1>
    <code-scanner />

    <list-container title="Added input points">
      <input-point-item v-for="point in store.state.inputPoints"
                        :key="point.id"
                        :point="point" />
    </list-container>

    <div>
      <h1 class="text-center text-2xl font-bold my-4">Input vehicles capacity</h1>
      <capacity-input />
    </div>
    <optimize-route-button />
  </div>
</template>
