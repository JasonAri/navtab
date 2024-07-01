<template>
  <div>
    <div class="search-bar">
      <section class="search-engine flex-center">
        <section class="icon-box flex-center">
          <img src="../assets/images/icon-bing-48.png" alt="bing" />
        </section>
      </section>
      <input class="search-input" type="text" placeholder="输入搜索内容" />
      <section class="search-icon flex-center">
        <section class="icon-box flex-center">
          <img src="../assets/images/icon-search-50.png" alt="search" />
        </section>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.search-bar {
  width: 580px;
  height: 52px;
  background-color: rgb(255, 255, 255, 0.5);
  position: absolute;
  top: 12vh;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .search-engine {
    width: 52px;
    height: 52px;
    .icon-box {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      &:hover {
        background-color: rgb(255, 255, 255, 0.6);
      }
      img {
        width: 24px;
        height: 24px;
        display: block;
      }
    }
  }
  .search-input {
    flex: 1;
    height: 32px;
    font-size: 16px;
    border: 0;
    outline: none;
    background: transparent;
  }
  .search-icon {
    width: 52px;
    height: 52px;
    .icon-box {
      width: 32px;
      height: 32px;
      border-radius: 8px;

      img {
        width: 24px;
        height: 24px;
        display: block;
      }
    }
  }
}
</style>
