<template>
  <div>
    <input type="file" @change="onFileChange" accept="image/*" />
    <div v-if="imageUrl">
      <h3>预览:</h3>
      <img :src="imageUrl" alt="Image Preview" style="max-width: 100px" />
    </div>
    <button @click="uploadImage" :disabled="!selectedFile">上传图标</button>
    <div v-if="uploadStatus">
      <p>{{ uploadStatus }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { uploadImageApi } from '../api/user'

const selectedFile = ref<File | null>(null)
const imageUrl = ref<string>('')
const uploadStatus = ref<string>('')

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0]
    // reader
    const reader = new FileReader()
    reader.onload = (e) => {
      imageUrl.value = e.target?.result as string
      console.log(e)
    }
    reader.readAsDataURL(selectedFile.value)
  }
}

const uploadImage = async () => {
  if (!selectedFile.value) return
  // fromData
  const formData = new FormData()
  formData.append('image', selectedFile.value)
  console.log(formData.get('image'))
  // upload
  try {
    uploadStatus.value = '上传中...'
    const res = await uploadImageApi(formData)
    if (res.code >= 200 && res.code < 300) {
      uploadStatus.value = '上传成功'
      console.log(res.data)
    }
  } catch (error) {
    uploadStatus.value = '上传失败！'
    console.error('Upload Error:', error)
  }
}
</script>

<style scoped lang="scss"></style>
