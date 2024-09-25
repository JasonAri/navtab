import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Bookmarks } from '../api/types/user'

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
  const isEditingBookmark = ref<boolean>(false)
  const isEditing = computed(() => isEditingBookmark.value)

  function updateBookmarkList(payload: Array<Bookmarks>) {
    bookmarkList.value = payload
  }
  function resetBookmarkList() {
    bookmarkList.value = defaultBookmarkList.value
  }
  function setIsEditing(state: boolean) {
    isEditingBookmark.value = state
  }
  function delBookmarkById(id: number) {
    const newBookmarkList = bookmarkList.value.filter((item) => {
      if (item.id !== id) return item
    })
    updateBookmarkList(newBookmarkList)
  }

  return {
    defaultBookmarkList,
    bookmarkList,
    isEditingBookmark,
    isEditing,
    updateBookmarkList,
    resetBookmarkList,
    setIsEditing,
    delBookmarkById
  }
})
