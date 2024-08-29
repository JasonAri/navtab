import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { getToken } from './tools'

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_PROXY_API,
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    const token = getToken()
    config.headers.Authorization = token ? `Bearer ${token}` : undefined
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

export default service
