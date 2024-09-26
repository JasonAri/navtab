<template>
  <SettingFilled
    class="setting-btn"
    @click="handleSettingBtn"
    ref="settingLogoRef"
  />
  <Transition name="fade">
    <div v-show="isShowMenu" class="setting-menu" ref="settingMenuRef">
      <div class="menu-list">
        <RouterLink class="list-item" to="/login" v-if="!isLogin">
          登录/注册
        </RouterLink>
        <a class="list-item" @click="handleLogout" v-if="isLogin">退出登录</a>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { SettingFilled } from '@ant-design/icons-vue'
import { useBookmarkStore } from '../store/bookmark'
import { getAccessToken, removeTokens } from '../utils/tools'

const isShowMenu = ref(false)
const isClickOutsite = ref(false)
const settingLogoRef: any = ref(null)
const settingMenuRef: any = ref(null)
const isLogin = ref(false)

const bookmarkStore = useBookmarkStore()
const { resetBookmarkList } = bookmarkStore

const handleSettingBtn = () => {
  isShowMenu.value = !isShowMenu.value
}
const handleLogout = () => {
  removeTokens()
  isLogin.value = false
  resetBookmarkList()
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
  if (getAccessToken()) {
    isLogin.value = true
  }
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
.list-item {
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
