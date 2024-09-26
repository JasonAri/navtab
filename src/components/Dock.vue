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
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookmarkStore } from '../store/bookmark'
import NavIcon from './NavIcon.vue'
import { getBookmarkListApi, setBookmarkListApi } from '../api/user'
import { getAccessToken, removeTokens } from '../utils/tools'
import { message } from 'ant-design-vue'
import { useDraggable } from 'vue-draggable-plus'

const bookmarkStore = useBookmarkStore()
const { bookmarkList } = storeToRefs(bookmarkStore)
const { updateBookmarkList, resetBookmarkList } = bookmarkStore

const el = ref()
useDraggable(el, bookmarkList, {
  animation: 150,
  ghostClass: 'ghost',
  onStart() {},
  onUpdate() {
    setUserBookmarkList()
    console.log('aaa')
  }
})

const getUserBookmarkList = async () => {
  await getBookmarkListApi()
    .then((res) => {
      // console.log(res)
      const bookmarkListData = res.data.bookmarkList
      if (bookmarkListData.length > 0) {
        updateBookmarkList(bookmarkListData)
      } else {
        resetBookmarkList()
      }
    })
    .catch((err) => {
      console.error('Failed to get bookmark list', err)
      message.warn('登录状态已过期，请重新登录')
      removeTokens()
      resetBookmarkList()
    })
}

const setUserBookmarkList = async () => {
  console.log(bookmarkList._rawValue)
  const reqData = bookmarkList._rawValue
  await setBookmarkListApi(reqData)
    .then((res) => {
      res.code === 201 && message.success('同步成功！')
    })
    .catch((err) => {
      console.error('Failed to set bookmark list', err)
      message.warn('同步失败!')
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
