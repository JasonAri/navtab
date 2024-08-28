import request from '../utils/request'

interface userData {
  username: string
  password: string
}

export function registerApi(data: userData) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

export function loginApi(data: userData) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getBookmarkListApi() {
  return request({
    url: '/user/getBookmarkList',
    method: 'get'
  })
}
