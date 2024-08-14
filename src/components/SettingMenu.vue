<template>
  <SettingFilled
    class="setting-btn"
    @click="handleSettingBtn"
    ref="settingLogoRef"
  />
  <Transition name="fade">
    <div v-show="isShowMenu" class="setting-menu" ref="settingMenuRef">
      <div class="menu-list">
        <RouterLink class="item-login" to="/login">登录/注册</RouterLink>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { SettingFilled } from '@ant-design/icons-vue'

const isShowMenu = ref(false)
const isClickOutsite = ref(false)
const settingLogoRef: any = ref(null)
const settingMenuRef: any = ref(null)

const handleSettingBtn = () => {
  isShowMenu.value = !isShowMenu.value
}

const handleClick = (e: MouseEvent) => {
  if (isShowMenu.value) {
    if (
      !settingLogoRef.value.contains(e.target as HTMLElement) &&
      !settingMenuRef.value.contains(e.target as HTMLElement)
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
.setting-menu {
  width: 150px;
  background-color: #fff;
  border-radius: 12px;
  position: absolute;
  top: 60px;
  right: 30px;
}
.menu-list {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.item-login {
  width: 90%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding: 5px 0;
  border-radius: 8px;
  color: #2d2e2e;
  text-decoration: none;
  &:hover {
    background-color: #eaeaea;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
