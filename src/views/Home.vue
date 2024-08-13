<template>
  <div class="container">
    <SettingMenu :showLoginPage="showLoginPage" />
    <SearchBar />
    <NavBar />
    <Login v-if="isLogin" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavBar from '../components/Dock.vue'
import SearchBar from '../components/SearchBar.vue'
import Login from '../components/Login.vue'
import SettingMenu from '../components/SettingMenu.vue'

const isLogin = ref(false)

const showLoginPage = () => {
  isLogin.value = !isLogin.value
}
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  overflow: hidden;
  background-image: url('/images/bg.jpg');
  background-size: cover;
}
</style>
