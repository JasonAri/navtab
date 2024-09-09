import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import { getAccessToken } from './tools'
import refreshAccessToken from './authService'

export interface ApiResponse<T> {
  code: number
  data: T
  message: string
}

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_PROXY_API,
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken()
    config.headers.Authorization = token ? `Bearer ${token}` : undefined
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    // original request
    const originalRequest = error.config
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken()
        originalRequest!.headers.Authorization = `Bearer ${newAccessToken}`
        return service(originalRequest as InternalAxiosRequestConfig)
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  }
)

// request
export default async function request<T>(config: any): Promise<ApiResponse<T>> {
  return service(config)
    .then((res: AxiosResponse<ApiResponse<T>>) => res.data)
    .catch((error) => Promise.reject(error))
}
