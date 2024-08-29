import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import { getToken } from './tools'

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
    const token = getToken()
    config.headers.Authorization = token ? `Bearer ${token}` : undefined
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// request
export default async function request<T>(config: any): Promise<ApiResponse<T>> {
  return service(config)
    .then((res: AxiosResponse<ApiResponse<T>>) => res.data)
    .catch((error) => Promise.reject(error))
}
