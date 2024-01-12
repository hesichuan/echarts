import { watch, ref } from 'vue'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosError
} from 'axios'
import axios from 'axios'

import router from '@/router'
import qs from 'qs'
import { config } from './config'

const currentRoute = ref('/')

const { base_url } = config

export const PATH_URL = base_url[import.meta.env.VITE_API_BASEPATH]

watch(
  () => router.currentRoute.value,
  (query) => {
    currentRoute.value = query?.path
  }
)

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: PATH_URL, // api 的 base_url
  timeout: config.request_timeout // 请求超时时间
})

const clearLoginInfo = () => {
  // wsCache.clear()
  // resetRouter() // 重置静态路由表
  // appStore.setLocalUser()
}
// request拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (
      config.method === 'post' &&
      (config.headers as AxiosRequestHeaders)['Content-Type'] ===
        'application/x-www-form-urlencoded'
    ) {
      config.data = qs.stringify(config.data)
    }
    // if (appStore.getLocalUser) {
      // }
    ;(config.headers as AxiosRequestHeaders)['Token'] = '67F4C4DF712F41EB31288EC6BDCD606D'
    // get参数编码
    if (config.method === 'get' && config.params) {
      let url = config.url as string
      url += '?'
      const keys = Object.keys(config.params)
      for (const key of keys) {
        if (config.params[key] !== void 0 && config.params[key] !== null) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`
        }
      }
      url = url.substring(0, url.length - 1)
      config.params = {}
      config.url = url
      // if (config.data) config.data = qs.stringify(config.data);
    }
    return config
  },
  (error: AxiosError) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  async (response: AxiosResponse<any>) => {
    if (response.data.status === 'SUCCEED') {
      return response.data
    } else if (response.data.errorCode === '100') {
      clearLoginInfo()
      if (currentRoute.value !== '/') {
        router.push(`/`)
        // router.push(`/login?redirect=${currentRoute.value}`)
      }
    } else if(response.config.url === '/china_geo.json'){
      return response.data
    } else {
      console.log('拦截器返回错误：', response)
      return Promise.reject(response?.data || 'response-error')
    }
  },
  (error: AxiosError) => {
    console.log('err-----' + error) // for debug
    console.log(error.errorMessage || error.message)
    return Promise.reject(error)
  }
)

export { service }
