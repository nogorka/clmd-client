<script setup>

import { useStore } from 'vuex'

const store = useStore()

store.dispatch('updateRecentRoutes')

const getRouteTo = (id) => {
  return '/map/' + id
}

const getRouteString = (id) => {
  const hash = id.slice(-7)
  return 'Route ' + hash
}
const getDateString = (dateString) => {

  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes} ${day}.${month}`
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <h2 class="text-lg font-bold mb-4">Latest Routes</h2>
    <hr class="mb-4">
    <ul class="space-y-2">
      <li v-for="route in store.state.recentRoutes" :key="route._id"
          class="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition-colors duration-300">
        <div class="flex justify-between items-center">
          <router-link :to="getRouteTo(route._id)" class="text-blue-500 hover:underline">
            {{ getRouteString(route._id) }}
          </router-link>
          <span class="text-gray-600">{{ getDateString(route.date) }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

