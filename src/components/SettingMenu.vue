<template>
  <SettingFilled
    class="setting-btn"
    @click="handleSettingBtn"
    id="settingLogoNode"
    ref="settingLogoRef"
  />
  <Transition name="fade">
    <div
      v-show="isShowMenu"
      class="setting-menu"
      id="settingMenuNode"
      ref="settingMenuRef"
    >
      <div class="menu-list">
        <div class="item-login" @click="handleLoginBtn">登录/注册</div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { SettingFilled } from '@ant-design/icons-vue'

const props = defineProps({
  showLoginPage: {
    type: Function,
    require: true
  }
})

const isShowMenu = ref(false)
const isClickOutsite = ref(false)
const settingLogoRef: any = ref(null)
const settingMenuRef: any = ref(null)

const handleSettingBtn = () => {
  isShowMenu.value = !isShowMenu.value
}

const handleLoginBtn = () => {
  isShowMenu.value = false
  props.showLoginPage?.()
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
