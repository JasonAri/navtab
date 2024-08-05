<template>
  <div class="container">
    <SearchBar />
    <NavBar />
    <Login v-if="isLogin" />
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import NavBar from '../components/Dock.vue'
import SearchBar from '../components/SearchBar.vue'
import Login from '../components/Login.vue'

const isLogin = ref(false)
</script>

<style scoped lang='scss'>
.container {
  height: 100vh;
  overflow: hidden;
  background-image: url('/images/bg.jpg');
  background-size: cover;
}
</style>