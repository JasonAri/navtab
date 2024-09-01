import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Bookmarks {
  id: number
  title: string
  imgUrl: string
  size: string
  href: string
  bgColor?: string
}

export const useBookmarkStore = defineStore('bookmark', () => {
  const defaultBookmarkList = ref<Array<Bookmarks>>([
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
  const bookmarkList = ref<Array<Bookmarks>>([])
  function updateBookmarkList(payload: Array<Bookmarks>) {
    bookmarkList.value = payload
  }
  function resetBookmarkList() {
    bookmarkList.value = defaultBookmarkList.value
  }

  return {
    defaultBookmarkList,
    bookmarkList,
    updateBookmarkList,
    resetBookmarkList
  }
})
