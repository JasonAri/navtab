<template>
  <div class="container">
    <SettingFilled
      class="setting-btn"
      @click="handleSettingBtn"
      id="settingLogoNode"
    />
    <SettingMenu v-show="isShowSetting" id="settingMenuNode" />
    <SearchBar />
    <NavBar />
    <Login v-if="isLogin" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import NavBar from '../components/Dock.vue'
import SearchBar from '../components/SearchBar.vue'
import Login from '../components/Login.vue'
import SettingMenu from '../components/SettingMenu.vue'
import { SettingFilled } from '@ant-design/icons-vue'

const isLogin = ref(false)
const isShowSetting = ref(false)
const isClickOutsite = ref(false)

const handleSettingBtn = () => {
  isShowSetting.value = !isShowSetting.value
}

const handleClick = (e: MouseEvent) => {
  // console.log(e.target)
  if (isShowSetting.value) {
    const settingMenuNode = document.getElementById('settingMenuNode')
    const settingLogoNode = document.getElementById('settingLogoNode')
    if (
      !settingLogoNode?.contains(e.target as HTMLElement) &&
      !settingMenuNode?.contains(e.target as HTMLElement)
    ) {
      handleSettingBtn()
    }
  }
}

watch(isClickOutsite, () => {
  console.log(isClickOutsite.value)
})

onMounted(() => {
  document.addEventListener('click', handleClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClick)
})
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  overflow: hidden;
  background-image: url('/images/bg.jpg');
  background-size: cover;
}
.setting-btn {
  position: absolute;
  top: 30px;
  right: 30px;
  color: rgba(255, 255, 255, 0.1);
  font-size: 24px;
  &:hover {
    color: rgba(255, 255, 255, 0.2);
  }
}
</style>
