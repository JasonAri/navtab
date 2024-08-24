// useRegexp.ts
const usernameRegexp = /^[a-zA-Z\u4e00-\u9fff][a-zA-Z\u4e00-\u9fff0-9]{2,14}$/
const passwordRegexp = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&,.]{8,16}$/

export default function regexp(user: { username: string; password: string }) {
  if (!usernameRegexp.test(user.username)) {
    return Promise.reject({ reason: 'username' })
  }
  if (!passwordRegexp.test(user.password)) {
    return Promise.reject({ reason: 'password' })
  }
  return Promise.resolve('ok')
}
