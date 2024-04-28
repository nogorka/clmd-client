<template>
  <div class="text-2xl">404 Not Found</div>
  <div>
    <p>Sorry</p>
    <p>Requested content not found. Would you like to go home?</p>
    <div class="flex gap-2 py-2 vertical-mid">
      <router-link to="/" class="text-blue-600 visited:text-purple-600">
        <span class="pi pi-arrow-left align-mid"> YES</span>
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
