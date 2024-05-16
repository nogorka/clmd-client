<script setup>
import { useStore } from 'vuex'

import ComplexButton from '@/components/complex-button.vue'
import RecentRouteItem from '@/components/recent-route-item.vue'
import ListContainer from '@/components/list-container.vue'

const store = useStore()
store.dispatch('updateRecentRoutes')

</script>

<template>
  <div class="container mx-auto p-4 gap-8">
    <div>
      <h1 class="text-center text-2xl font-bold my-4">Welcome! Choose an input method:</h1>
      <div class="flex justify-center gap-4">
        <complex-button icon="pi pi-table" to="/import-file">Import File</complex-button>
        <complex-button icon="pi pi-search" to="/manual-input">Input Manually</complex-button>
        <complex-button icon="pi pi-qrcode" to="/scan-qr">Scan QR</complex-button>
      </div>
    </div>

    <list-container title="Latest routes">
      <recent-route-item v-for="route in store.state.recentRoutes"
                         :key="route._id"
                         :route="route" />
    </list-container>
  </div>
</template>
