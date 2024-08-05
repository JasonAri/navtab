<template>
  <div class="login-container">
    <img class="app-logo" src="/images/icon-app-logo.png" />
    <div class="left-box">
      <div class="login-title">登录</div>
      <Form class="login-form">
        <FormItem class="form-item" name="username">
          <span class="text-tips">用户名</span>
          <Input class="form-input" v-model:value="formState.username" />
          <div class="div-line"></div>
        </FormItem>
        <FormItem class="form-item" name="password">
          <span class="text-tips">密码</span>
          <InputPassword
            class="form-input"
            v-model:value="formState.password"
          />
          <div class="div-line"></div>
        </FormItem>
        <FormItem class="btn-box">
          <Button class="btn" type="text">登录 / 注册</Button>
        </FormItem>
      </Form>
    </div>
  </div>
  <div class="overlay"></div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Form, FormItem, Input, Button, InputPassword } from 'ant-design-vue'

interface FormState {
  username: string
  password: string
}
const formState = reactive<FormState>({
  username: '',
  password: ''
})
</script>

<style scoped lang="scss">
.login-container {
  width: 800px;
  height: 450px;
  background-image: url('/images/user-login-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
}
.app-logo {
  width: 32px;
  height: 32px;
  margin: 20px 25px 0 25px;
}
.left-box {
  width: 300px;
  padding: 0 70px;
}
.login-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin: 20px 0 50px 0;
  color: #928cb1;
}
.text-tips {
  color: #9c9c9c;
  font-size: 14px;
  font-weight: 500;
}
.form-input {
  border: none;
  box-shadow: none;
}
.div-line {
  border-bottom: 1px solid #cfcfcf;
}
.btn-box {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  .btn {
    color: #fff;
    width: 200px;
    background-color: #a9a2cc;
    &:hover {
      background-color: #7e7999;
    }
    &:active {
      background-color: #545065;
    }
  }
}
.overlay {
  position: relative;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
</style>
