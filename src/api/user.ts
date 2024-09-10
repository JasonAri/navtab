import request from '../utils/request'
import {
  ReqUserData,
  ResTokens,
  ResBookmarkList,
  Bookmarks,
  ReqBookmarkListData
} from './types/user'

export function loginApi(data: ReqUserData) {
  return request<ResTokens>({ url: '/user/login', method: 'post', data })
}

export function registerApi(data: ReqUserData) {
  return request<ResTokens>({ url: '/user/register', method: 'post', data })
}

export function getBookmarkListApi() {
  return request<ResBookmarkList<Bookmarks>>({
    url: '/user/getBookmarkList',
    method: 'get'
  })
}

export function setBookmarkListApi(data: ReqBookmarkListData<Bookmarks>) {
  return request<ResBookmarkList<Bookmarks>>({
    url: '/user/setBookmarkList',
    method: 'post',
    data
  })
}
