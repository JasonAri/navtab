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
  <Drawer
    :width="300"
    title="添加书签"
    placement="left"
    :open="showDrawer"
    @close="closeDrawer"
  >
    <div><span>书签名</span></div>
    <input type="text" placeholder="书签名" />
    <div><span>链接</span></div>
    <input type="text" placeholder="链接" />
    <hr />
    <div><span>图标</span></div>
    <input type="file" @change="handleFileChange" />
    <button @click="uploadFile" :disabled="!file">上传图片</button>
  </Drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookmarkStore } from '../store/bookmark'
import NavIcon from './NavIcon.vue'
import {
  getBookmarkListApi,
  setBookmarkListApi,
  uploadFileApi
} from '../api/user'
import { getAccessToken, removeTokens } from '../utils/tools'
import { message, Drawer } from 'ant-design-vue'
import { useDraggable } from 'vue-draggable-plus'

const file = ref<File | null>(null)
const showDrawer = ref<boolean>(false)
const bookmarkStore = useBookmarkStore()
const { bookmarkList, isEditingBookmark } = storeToRefs(bookmarkStore)
const { updateBookmarkList, resetBookmarkList, setIsEditing } = bookmarkStore

const el = ref()
const draggable = useDraggable(el, bookmarkList, {
  animation: 150,
  ghostClass: 'ghost',
  disabled: true,
  onStart() {},
  onUpdate() {}
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
const setUserBookmarkList = async (data: any) => {
  await setBookmarkListApi(data)
    .then((res) => {
      res.code === 201 && message.success('同步成功！')
    })
    .catch((err) => {
      console.error('Failed to set bookmark list', err)
      message.warn('同步失败!')
    })
}

const handleSaveEditing = () => {
  setIsEditing(false)
  const data = { bookmarkList: bookmarkList.value }
  setUserBookmarkList(data)
}
const handleAddBookmark = () => {
  showDrawer.value = true
}
const closeDrawer = () => {
  showDrawer.value = false
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    file.value = target.files[0]
  }
}

const uploadFile = async () => {
  if (!file.value) return

  const formData = new FormData()
  formData.append('image', file.value)

  await uploadFileApi(formData)
    .then((res) => {
      console.log(res)
      showDrawer.value = false
    })
    .catch((err) => {
      console.error(err)
    })
}

watch(isEditingBookmark, () => {
  // console.log(isEditingBookmark.value)
  isEditingBookmark.value == true ? draggable.resume() : draggable.pause()
})
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
