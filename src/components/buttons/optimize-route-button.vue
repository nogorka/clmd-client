<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElLoading } from 'element-plus'
import { ref } from 'vue'
import { UiMessage } from '@/utils/message-helper.js'

const store = useStore()
const router = useRouter()
const loading = ref(null)

const onClick = async () => {
  if (store.state.inputPoints.length > 0) {
    loading.value = ElLoading.service({
      lock: true,
      text: 'Optimizing your route...'
    })
    const id = await store.dispatch('optimizeRoute')
    if (id) {
      loading.value.close()
      router.push({ name: 'map', params: { id } })
    } else {
      UiMessage.error('Error, try again')
    }
  } else {
    UiMessage.error('There\'s no input points')
  }
}
</script>

<template>
  <button
    type="button"
    class="mt-4 w-full border-2 border-blue-500 text-blue-500 py-2 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
    @click="onClick"
  >
    Optimize route
    <i class="pi pi-truck ml-2"></i>
  </button>
</template>
