import request from '../utils/request'
import { ReqUserData, ResTokens, ResBookmarkList } from './types/user'

export function loginApi(data: ReqUserData) {
  return request<ResTokens>({ url: '/user/login', method: 'post', data })
}

export function registerApi(data: ReqUserData) {
  return request<ResTokens>({ url: '/user/register', method: 'post', data })
}

export function getBookmarkListApi<T>() {
  return request<ResBookmarkList<T>>({
    url: '/user/getBookmarkList',
    method: 'get'
  })
}
