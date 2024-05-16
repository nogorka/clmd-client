<template>
  <qrcode-stream
    v-if="selectedDevice !== null"
    v-loading="cameraLoading"
    :constraints="{ deviceId: selectedDevice.deviceId }"
    :track="trackFunctionSelected.value"
    :formats="['qr_code']"
    @error="onError"
    @detect="onDetect"
    @camera-on="onCameraReady"
    @camera-off="onCameraDisconnect"
  />
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

import { UiMessage } from '@/utils/message-helper.js'

/*** detection handling ***/

const result = ref('')

function onDetect(detectedCodes) {
  console.log(detectedCodes)
  result.value = JSON.stringify(detectedCodes.map((code) => code.rawValue))
  console.log(detectedCodes.map((code) => code.rawValue))
}

/*** select camera ***/

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

    ctx.lineWidth = 2
    ctx.strokeStyle = '#007bff'
    ctx.strokeRect(x, y, width, height)
  }
}


const trackFunctionOptions = [
  { text: 'nothing (default)', value: undefined },
  { text: 'bounding box', value: paintBoundingBox }
]
const trackFunctionSelected = ref(trackFunctionOptions[1])


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
