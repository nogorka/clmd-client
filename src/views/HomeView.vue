<script setup>
import ComplexButton from '@/components/complex-button.vue'
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-center text-2xl font-bold my-4">Welcome! Choose an input method:</h1>
    <div class="flex justify-center gap-4">
      <complex-button icon="pi pi-table" to="/import-file">Import File</complex-button>
      <complex-button icon="pi pi-search" to="/manual-input">Input Manually</complex-button>
      <complex-button icon="pi pi-qrcode" to="/scan-qr">Scan QR Code</complex-button>
    </div>
  </div>
</template>
