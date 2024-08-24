import { message } from 'ant-design-vue'

const usernameRegexp = /^[a-zA-Z\u4e00-\u9fff][a-zA-Z\u4e00-\u9fff0-9]{2,14}$/
const passwordRegexp = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&,.]{8,16}$/

export default function regexp(user: { username: string; password: string }) {
  if (!usernameRegexp.test(user.username)) {
    message.error('用户名应由3-15位英文或汉字组成')
    return Promise.reject({reason:'username'})
  }
  if (!passwordRegexp.test(user.password)) {
    message.error('密码应由8-16位英文字母和数字组成')
    return Promise.reject({reason:'password'})
  }
  return Promise.resolve('ok')
}
