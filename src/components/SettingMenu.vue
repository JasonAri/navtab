<template>
  <div>
    <div class="container">
      <div class="btn-list">
        <div class="login">登录/注册</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.container {
  width: 150px;
  background-color: #fff;
  border-radius: 12px;
  position: absolute;
  top: 60px;
  right: 30px;
}
.btn-list {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login {
  width: 90%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding: 5px 0;
  border-radius: 8px;
  &:hover {
    background-color: #eaeaea;
  }
}
</style>
