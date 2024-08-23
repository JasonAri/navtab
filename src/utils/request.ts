import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_PROXY_API,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
})

request.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

request.interceptors.response.use(
  (response) => {
    try {
      const { code, message, data } = response.data
      switch (code) {
        case 200:
          return data
        default:
          return Promise.reject(new Error(code + message))
      }
    } catch (error) {
      return Promise.reject(new Error((error as Error).message))
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
