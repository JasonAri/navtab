<template>
  <div class="container">
    <Login />
    <SearchBar />
    <NavBar />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/Dock.vue'
import SearchBar from './components/SearchBar.vue'
import Login from './components/Login.vue'
</script>

<style scoped>
.container {
  height: 100vh;
  overflow: hidden;
  background-image: url('/images/bg.jpg');
  background-size: cover;
}
</style>
