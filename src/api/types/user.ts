export interface ReqUserData {
  username: string
  password: string
}

export interface ResToken {
  token: string
}

export interface ResBookmarkList<T> {
  bookmarkList: Array<T>
}
