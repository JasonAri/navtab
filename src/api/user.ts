import request from '../utils/request'

interface UserData {
  username: string
  password: string
}

interface ResData {
  code: number
  data: object
  message: string
}

export function registerApi(data: UserData) {
  return request<ResData>({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function loginApi(data: UserData) {
  return request<ResData>({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getBookmarkListApi() {
  return request<ResData>({
    url: '/user/getBookmarkList',
    method: 'get'
  })
}
