<template>
  <div class="flex gap-2 py-2 vertical-mid">
    <router-link to="/" class="text-blue-600 visited:text-purple-600">
      <span class="pi pi-arrow-left align-mid"> <slot /></span>
    </router-link>
  </div>
</template>
