import { defineStore } from 'pinia'
import { Bookmarks } from '../api/types/user'
import { getBookmarkListApi, setBookmarkListApi } from '../api/user'

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
    bookmarkList: [] as Array<Bookmarks>
  }),
  actions: {
    async getBookmarkList() {
      try {
        const res = await getBookmarkListApi()
        if (res.data.bookmarkList.length > 0) {
          this.bookmarkList = res.data.bookmarkList
        } else {
          throw new Error('书签数据错误')
        }
        return Promise.resolve('OK')
      } catch (error) {
        return Promise.reject(error)
      }
    },
    resetBookmarkList() {
      this.bookmarkList = this.defaultBookmarkList
    },
    async saveBookmarkList() {
      try {
        const data = { bookmarkList: this.bookmarkList }
        const res = await setBookmarkListApi(data)
        if (res.code >= 400) {
          throw new Error(res.message)
        }
        return Promise.resolve(res)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async delBookmarkById(id: number) {
      try {
        const newBookmarkList = this.bookmarkList.filter((item) => {
          if (item.id !== id) return item
        })
        this.bookmarkList = newBookmarkList
        const res = await this.saveBookmarkList()
        return Promise.resolve(res)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async editBookmarkById(id: number, bookmark: Bookmarks) {
      try {
        const idx = this.bookmarkList.findIndex((item) => {
          return item.id === id
        })
        if (idx === -1) return
        this.bookmarkList.splice(idx, 1, bookmark)
        const res = await this.saveBookmarkList()
        return Promise.resolve(res)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
