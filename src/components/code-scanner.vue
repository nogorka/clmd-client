<template>
  <qrcode-stream
    v-if="selectedDevice !== null"
    v-loading="cameraLoading"
    :constraints="{ deviceId: selectedDevice.deviceId }"
    :track="trackFunctionSelected"
    :formats="['qr_code']"
    @error="onError"
    @detect="onDetect"
    @camera-on="onCameraReady"
    @camera-off="onCameraDisconnect"
  >
    <div class="flex justify-between">
      <select v-model="selectedDevice">
        <option
          v-for="device in devices"
          :key="device.label"
          :value="device"
        >
          {{ device.label }}
        </option>
      </select>
      <div>
        <span>Show tracking </span>
        <el-switch
          v-model="useTrack"
          inline-prompt
          :active-icon="Check"
          :inactive-icon="Close"
        />
      </div>
    </div>
  </qrcode-stream>
</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import { useStore } from 'vuex'

import { UiMessage } from '@/utils/message-helper.js'
import { Check, Close } from '@element-plus/icons-vue'

const store = useStore()

function onDetect(detectedArray) {
  const resultObject = JSON.parse(detectedArray.map((code) => code.rawValue))
  store.dispatch('addInputPoint', resultObject)
  UiMessage.success(`Successfully added: ${resultObject.id}`, 1500)
}


const selectedDevice = ref(null)
const devices = ref([])

onMounted(async () => {
  devices.value = (await navigator.mediaDevices.enumerateDevices()).filter(
    ({ kind }) => kind === 'videoinput'
  )

  if (devices.value.length > 0) {
    selectedDevice.value = devices.value[0]
  }
})

/*** track functons ***/

function paintBoundingBox(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height }
    } = detectedCode

    ctx.lineWidth = 6
    ctx.strokeStyle = '#ff0000'
    ctx.strokeRect(x, y, width, height)
  }
}

const useTrack = ref(true)
const trackFunctionOptions = [
  { text: 'nothing (default)', value: undefined },
  { text: 'bounding box', value: paintBoundingBox }
]
const trackFunctionSelected = computed(
  () => useTrack.value === true ?
    trackFunctionOptions[1].value :
    trackFunctionOptions[0].value
)


/*** error handling ***/

const errorMessages = {
  NotAllowedError: 'Camera access permission is required. Please grant permission.',
  NotFoundError: 'No camera detected on this device.',
  NotSupportedError: 'A secure context is required (HTTPS or localhost).',
  NotReadableError: 'Unable to access the camera. It might be in use by another application.',
  OverconstrainedError: 'The available cameras do not meet the required constraints.',
  StreamApiNotSupportedError: 'The Stream API is not supported by this browser.',
  InsecureContextError: 'Camera access is only allowed in a secure context. Please use HTTPS or localhost.'
}

const onError = (error) => {
  const message = `${error.name}: ` + (errorMessages[error.name] || error.message)
  UiMessage.error(message, 0)
}

const cameraLoading = ref(true)

const onCameraReady = (event) => {
  cameraLoading.value = false
}

const onCameraDisconnect = (event) => {
  cameraLoading.value = true
}


</script>
