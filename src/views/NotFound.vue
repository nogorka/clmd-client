<template>
  <div class="container mx-auto p-4 text-center">
    <h1 class="text-4xl font-bold my-4">404: Page Not Found</h1>
    <p>Sorry. The page you are looking for does not exist.</p>
    <p>Would you like to go home?</p>
    <div class="flex justify-center"><go-back /></div>
  </div>
</template>

<script setup>
import GoBack from '@/components/go-back.vue'
</script>
