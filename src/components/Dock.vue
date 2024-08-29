<template>
  <div class="dock">
    <div class="dock-list">
      <NavIcon
        v-for="item in navIconList"
        :key="item.id"
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
import { onMounted, reactive } from 'vue'
import NavIcon from './NavIcon.vue'
import { getBookmarkListApi } from '../api/user'
import { getToken } from '../utils/tools'

interface Bookmarks {
  id: number
  title: string
  imgUrl: string
  size: string
  href: string
  bgColor?: string
}

let navIconList: Array<Bookmarks> = reactive([
  {
    id: 0,
    title: 'notion',
    imgUrl: 'icon-notion.svg',
    size: '48',
    href: 'https://www.notion.so/'
  },
  {
    id: 1,
    title: 'github',
    imgUrl: 'icon-github.com.svg',
    size: '38',
    href: 'https://github.com/'
  },
  {
    id: 2,
    title: '掘金',
    imgUrl: 'icon-juejin.cn.svg',
    size: '38',
    href: 'https://juejin.cn/'
  },
  {
    id: 3,
    title: 'bilibili',
    imgUrl: 'icon-bilibili.svg',
    size: '48',
    href: 'https://bilibili.com/'
  }
])

const getUserBookmarkList = () => {
  getBookmarkListApi<Bookmarks>()
    .then((res) => {
      console.log(res)
      Object.assign(navIconList, res.data.bookmarkList)
    })
    .catch((err) => {
      console.warn(err)
    })
}

onMounted(() => {
  if (getToken()) {
    getUserBookmarkList()
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
</style>
