<template>
  <div class="dock">
    <div class="dock-list" ref="el">
      <NavIcon
        v-for="item in bookmarkList"
        :key="item.id"
        :id="item.id"
        :imgUrl="item.imgUrl"
        :size="item.size"
        :href="item.href"
        :bgColor="item.bgColor"
        :title="item.title"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookmarkStore } from '../store/bookmark'
import NavIcon from './NavIcon.vue'
import { getAccessToken, removeTokens } from '../utils/tools'
import { message } from 'ant-design-vue'
import { useDraggable } from 'vue-draggable-plus'

const bookmarkStore = useBookmarkStore()
const { bookmarkList } = storeToRefs(bookmarkStore)
const { getBookmarkList, resetBookmarkList, saveBookmarkList } = bookmarkStore

const el = ref()
useDraggable(el, bookmarkList, {
  animation: 150,
  ghostClass: 'ghost',
  delay: 50,
  onStart() {},
  onUpdate() {
    saveUserBookmarkList()
  }
})

const getUserBookmarkList = async () => {
  await getBookmarkList()
    .then(() => {
      // console.log(res)
    })
    .catch((err) => {
      console.error(err)
      message.error('获取书签数据失败')
      resetBookmarkList()
      removeTokens()
    })
}

const saveUserBookmarkList = async () => {
  await saveBookmarkList()
    .then((res) => {
      console.log(res)
      message.success('同步成功')
    })
    .catch((err) => {
      console.error(err)
      message.error('同步失败，请重试')
    })
}

onMounted(() => {
  if (getAccessToken()) {
    getUserBookmarkList()
  } else {
    resetBookmarkList()
  }
})
</script>

<style scoped lang="scss">
.dock {
  background-color: rgb(211, 211, 211, 0.5);
  min-width: 76px;
  height: 86px;
  position: absolute;
  text-align: center;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 26px;
  .dock-list {
    margin: 0 10px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-box {
      background-color: #fff;
      width: 60px;
      height: 60px;
      margin: 0 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      img {
        width: 32px;
        height: 32px;
      }
    }
  }
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.editing-btn {
  font-size: 24px;
  margin: 0 10px;
  color: rgba(255, 255, 255, 0.5);
  &:hover {
    color: rgba(255, 255, 255, 0.2);
  }
  &:active {
    color: rgba(255, 255, 255, 0.3);
  }
}
</style>
