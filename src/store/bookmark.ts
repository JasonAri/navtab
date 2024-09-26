import { defineStore } from 'pinia'
import { Bookmarks } from '../api/types/user'

export const useBookmarkStore = defineStore('bookmark', {
  state: () => ({
    defaultBookmarkList: [
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
    ],
    bookmarkList: [] as Array<Bookmarks>,
    isEditingBookmark: false as boolean
  }),
  actions: {
    updateBookmarkList(payload: Array<Bookmarks>) {
      console.log(this)
      this.bookmarkList = payload
    },
    resetBookmarkList() {
      this.bookmarkList = this.defaultBookmarkList
    },
    setIsEditing(status: boolean) {
      this.isEditingBookmark = status
    },
    delBookmarkById(id: number) {
      const newBookmarkList = this.bookmarkList.filter((item) => {
        if (item.id !== id) return item
      })
      this.updateBookmarkList(newBookmarkList)
    }
  }
})
