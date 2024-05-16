<template>
  <div>
    <p class="text-red-600 font-semibold">{{ error }}</p>

    <div>
      <qrcode-stream
        v-if="selectedDevice !== null"
        :constraints="{ deviceId: selectedDevice.deviceId }"
        :track="trackFunctionSelected.value"
        :formats="selectedBarcodeFormats"
        @error="onError"
        @detect="onDetect"
      />
      <p v-else class="text-red-600 font-semibold"> No cameras on this device </p>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

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

/*** barcode formats ***/

const barcodeFormats = { qr_code: true }
const selectedBarcodeFormats = computed(() => {
  return Object.keys(barcodeFormats.value).filter((format) => barcodeFormats.value[format])
})

/*** error handling ***/

const error = ref('')

function onError(err) {
  error.value = `[${err.name}]: `

  if (err.name === 'NotAllowedError') {
    error.value += 'you need to grant camera access permission'
  } else if (err.name === 'NotFoundError') {
    error.value += 'no camera on this device'
  } else if (err.name === 'NotSupportedError') {
    error.value += 'secure context required (HTTPS, localhost)'
  } else if (err.name === 'NotReadableError') {
    error.value += 'is the camera already in use?'
  } else if (err.name === 'OverconstrainedError') {
    error.value += 'installed cameras are not suitable'
  } else if (err.name === 'StreamApiNotSupportedError') {
    error.value += 'Stream API is not supported in this browser'
  } else if (err.name === 'InsecureContextError') {
    error.value +=
      'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
  } else {
    error.value += err.message
  }
}
</script>

<style scoped>

.barcode-format-checkbox {
  margin-right: 10px;
  white-space: nowrap;
}
</style>
