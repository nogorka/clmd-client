<template>
  <list-container title="Latest routes">
    <recent-route-item v-for="route in store.state.recentRoutes"
                       :key="route._id"
                       :route="route" />
  </list-container>
</template>
<script setup>
import ListContainer from '@/components/lists/list-container.vue'
import RecentRouteItem from '@/components/lists/recent-route-item.vue'
import { useStore } from 'vuex'

const store = useStore()

store.dispatch('updateRecentRoutes')
</script>
