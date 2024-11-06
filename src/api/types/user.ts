export interface ReqUserData {
  username: string
  password: string
}

export interface ResTokens {
  accessToken: string
  refreshToken: string
}

export interface ResBookmarkList<T> {
  bookmarkList: Array<T>
}

export interface Bookmarks {
  id: string
  title: string
  imgUrl: string
  size: number
  href: string
  bgColor?: string
}

export interface ReqBookmarkListData<T> {
  bookmarkList: Array<T>
}

export interface ResUploadImage {
  imagePath: string
}
