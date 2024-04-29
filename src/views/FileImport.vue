<script setup>
import GoBack from '@/components/go-back.vue'
import { UploadFilled } from '@element-plus/icons-vue'
</script>

<template>
  <div class="container mx-auto p-4">
    <go-back />

    <h1 class="text-center text-2xl font-bold my-4">File Import</h1>

    <el-upload
      class="upload-demo"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">Drop CSV/JSON file here or <em>click to upload</em></div>
    </el-upload>
  </div>
</template>
