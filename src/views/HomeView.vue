<script setup>
import ComplexButton from '@/components/buttons/complex-button.vue'
import RecentRouteList from '@/components/lists/recent-route-list.vue'

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

    <recent-route-list />

  </div>
</template>
