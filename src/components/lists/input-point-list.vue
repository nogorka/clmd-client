<template>
  <list-container title="Added input points">
    <input-point-item v-for="point in store.state.inputPoints"
                      :key="point.id"
                      :point="point" />
  </list-container>
</template>
<script setup lang="ts">
import ListContainer from '@/components/lists/list-container.vue'
import InputPointItem from '@/components/lists/input-point-item.vue'
import { useStore } from 'vuex'

const store = useStore()

</script>
