<script setup lang="ts">
import NavBar from "./components/Dock.vue";
import SearchBar from "./components/SearchBar.vue";
</script>

<template>
  <div class="container">
    <!-- <img src="./assets/images/bg.png" alt=""> -->
    <SearchBar />
    <NavBar />
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-image: url("./assets/images/bg.jpg");
  background-size: cover;
}
</style>
