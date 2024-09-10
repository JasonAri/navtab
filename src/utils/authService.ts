import axios, { AxiosResponse } from 'axios'
import { getRefreshToken, setAccessToken, setRefreshToken } from './tools'

interface ApiResponse<T> {
  code: number
  data: T
  message: string
}

type RefreshTokenResData = {
  accessToken: string
  refreshToken: string
}

const refreshAccessToken = async () => {
  const refreshToken: string = getRefreshToken() || ''
  if (!refreshToken) {
    throw new Error()
  }

  const url = import.meta.env.VITE_APP_PROXY_API + '/auth/refreshToken'

  try {
    const res: AxiosResponse<ApiResponse<RefreshTokenResData>> =
      await axios.post(url, {
        refreshToken
      })
    setAccessToken(res.data.data.accessToken)
    setRefreshToken(res.data.data.refreshToken)
    console.log('Refresh Succeed')
    return res.data.data.accessToken
  } catch (error) {
    console.error('Failed to refresh token', error)
    throw error
  }
}

export default refreshAccessToken
