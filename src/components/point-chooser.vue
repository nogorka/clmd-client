<template>
  <el-form :inline="true" :model="form">
    <el-form-item>
      <el-input v-model="form.query" placeholder="Enter address or coordinates" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.enter="onSubmit">Search</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'
import { fetchLocationData } from '@/utils/geocoding.js'

const form = ref({ query: '' })

const onSubmit = async () => {
  const point = await fetchLocationData(form.query)
  console.log(point)
}


</script>
