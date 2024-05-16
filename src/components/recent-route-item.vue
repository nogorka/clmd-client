<template>
  <li class="p-4 rounded-lg border-2 border-gray-200 hover:bg-gray-200 transition-colors duration-300">
    <div class="flex justify-between items-center">
      <router-link :to="getRouteTo(route._id)" class="text-blue-500 hover:underline">
        {{ getRouteString(route._id) }}
      </router-link>
      <span class="text-gray-600">{{ getDateString(route.date) }}</span>
    </div>
  </li>
</template>

<script setup>
defineProps({
  route: {
    type: Object,
    required: true,
    default: null
  }
})

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
