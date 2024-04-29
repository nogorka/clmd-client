<script setup>
import GoBack from '@/components/go-back.vue'
import { QrcodeStream } from 'vue-qrcode-reader';

const onDecode = (result) => {
  console.log('Decoded result:', result);
  // You can route or perform actions based on the result here
}
const onInit = (promise) => {
  promise.then(() => {
    console.log('QR Code scanner initialized');
  }).catch(error => {
    if (error.name === 'NotAllowedError') {
      console.error('Permissions to access camera are denied');
    } else if (error.name === 'NotFoundError') {
      console.error('No camera on this device');
    }
  });
}
</script>

<template>
  <div class="container mx-auto p-4">
    <go-back />

    <h1 class="text-center text-2xl font-bold my-4">Scan QR Code</h1>
    <qrcode-stream @decode="onDecode" @init="onInit" />
  </div>
</template>
