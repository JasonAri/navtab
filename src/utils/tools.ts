export function setAccessToken(accessToken: string) {
  return localStorage.setItem('access_token', accessToken)
}

export function setRefreshToken(refreshToken: string) {
  return localStorage.setItem('refresh_token', refreshToken)
}

export function getAccessToken() {
  return localStorage.getItem('access_token')
}

export function getRefreshToken() {
  return localStorage.getItem('refresh_token')
}

export function removeTokens() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}
