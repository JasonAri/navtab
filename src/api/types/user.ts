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
