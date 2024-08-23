import request from '../utils/request'

interface RegisterRequestData {
  username: string
  password: string
}

export function registerApi(data: RegisterRequestData) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}
