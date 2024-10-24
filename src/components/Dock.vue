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
        @addOrEditBookmark="showDrawer"
      />
    </div>
  </div>
  <Drawer
    :title="drawerInfo.drawerTitle"
    placement="left"
    :open="drawerInfo.drawerVisible"
    @close="closeDrawer"
  >
    <Form :model="bookmarkInfo" :label-col="{ style: { width: '100px' } }">
      <FormItem label="书签名">
        <Input v-model:value="bookmarkInfo.title" />
      </FormItem>
      <FormItem label="URL">
        <Input v-model:value="bookmarkInfo.href" />
      </FormItem>
      <ImageUpload />
      <FormItem label="图标地址">
        <Input :placeholder="bookmarkInfo.imgUrl" :disabled="true" />
      </FormItem>
      <FormItem label="图标大小 (px)">
        <Input v-model:value="bookmarkInfo.size" />
      </FormItem>
      <FormItem label="背景颜色">
        <Input v-model:value="bookmarkInfo.bgColor" />
      </FormItem>
      <div class="favicon-container">
        <div
          class="favicon-bg"
          :style="{ backgroundColor: bookmarkInfo.bgColor }"
        >
          <img
            :src="`${imgBaseUrl}${bookmarkInfo.imgUrl}`"
            alt="baidu.com favicon"
            :style="{
              width: bookmarkInfo.size + 'px',
              height: bookmarkInfo.size + 'px'
            }"
          />
        </div>
      </div>
      <Button style="width: 45%" @click="closeDrawer">取消</Button>
      <Button
        style="width: 45%; margin-left: 10%"
        type="primary"
        @click="handleAddOrSave"
      >
        {{ drawerInfo.drawerTitle === '编辑书签' ? '保存' : '添加' }}
      </Button>
    </Form>
  </Drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, toRaw } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookmarkStore } from '../store/bookmark'
import NavIcon from './NavIcon.vue'
import { getAccessToken, removeTokens } from '../utils/tools'
import { message, Drawer, Form, FormItem, Input, Button } from 'ant-design-vue'
import { useDraggable } from 'vue-draggable-plus'
import { Bookmarks } from '../api/types/user'
import ImageUpload from './ImageUpload.vue'

const drawerInfo = reactive({
  drawerTitle: '',
  drawerVisible: false
})
const defaultBookmarkInfo = {
  id: 0,
  title: 'notion',
  imgUrl: 'icon-notion.svg',
  size: '48',
  href: 'https://www.notion.so/',
  bgColor: '#fff'
}
const bookmarkInfo = reactive({}) as Bookmarks
const imgBaseUrl = import.meta.env.VITE_APP_PROXY_TARGET + '/images'

const bookmarkStore = useBookmarkStore()
const { bookmarkList } = storeToRefs(bookmarkStore)
const {
  getBookmarkList,
  resetBookmarkList,
  saveBookmarkList,
  editBookmarkById
} = bookmarkStore

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
    .then(() => {})
    .catch((err) => {
      console.error(err)
      message.error('获取书签数据失败')
      resetBookmarkList()
      removeTokens()
    })
}

const saveUserBookmarkList = async () => {
  await saveBookmarkList()
    .then(() => {
      message.success('同步成功')
    })
    .catch((err) => {
      console.error(err)
      message.error('同步失败，请重试')
    })
}

const showDrawer = (bookmarkId: number | undefined) => {
  if (bookmarkId === undefined) {
    drawerInfo.drawerTitle = '添加书签'
    Object.assign(bookmarkInfo, defaultBookmarkInfo)
  } else {
    drawerInfo.drawerTitle = '编辑书签'
    const bookmarkData = bookmarkList.value.find(
      (item) => item.id === bookmarkId
    )
    Object.assign(bookmarkInfo, toRaw(bookmarkData))
  }
  drawerInfo.drawerVisible = true
}

const closeDrawer = () => {
  drawerInfo.drawerVisible = false
}

const handleAddOrSave = async () => {
  if (drawerInfo.drawerTitle == '添加书签') {
    // add
  } else {
    // edit
    await editBookmarkById(bookmarkInfo.id, toRaw(bookmarkInfo))
      .then(() => {
        message.success('修改成功')
        closeDrawer()
      })
      .catch((err) => {
        console.error(err)
        message.error('修改失败，请重试')
      })
  }
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
.favicon-container {
  background-color: #eee;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  .favicon-bg {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    border-radius: 12px;
  }
}
</style>
