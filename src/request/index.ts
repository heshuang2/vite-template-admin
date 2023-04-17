import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { AxiosRequest } from '#/request'
import qs from 'qs'
import { getToken } from '@/utils/auth'
import router from '@/router'

console.log(import.meta.env)

const defaultConfig: AxiosRequestConfig = {
    baseURL: '/api', // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // request timeout
    // 数组格式参数序列化
    paramsSerializer: params => qs.stringify(params, { indices: false })
}

class Request {
    constructor() {
        this.requestInterceptorsRequest()
        this.requestInterceptorsResponse()
    }

    /*
     * 初始化配置对象
     * private static initialConfig = {}
     */

    // 保存 Axios 实例对象
    private static axiosInstance: AxiosInstance = axios.create(defaultConfig)

    // 请求拦截
    private requestInterceptorsRequest(): void {
        Request.axiosInstance.interceptors.request.use(
            config => {
                const token = getToken()
                if (token) {
                    config.headers!['Authorization'] = `Bearer ${token}`
                }
                return config
            },
            err => Promise.reject(err)
        )
    }

    // 响应拦截
    private requestInterceptorsResponse(): void {
        const instance = Request.axiosInstance
        instance.interceptors.response.use(
            async response => {
                const res = response.data
                // if the custom code is not 200, it is judged as an error.
                if (res.code !== 200) {
                    // 500: Illegal token; 501: Other clients logged in; 504: Token expired;
                    if (res.code === 500 || res.code === 501 || res.code === 504) {
                        // to re-login
                        ElMessage({ type: 'error', message: res.message })
                        await router.push(`/login?redirect=${router.currentRoute.value?.fullPath}`)
                    }
                    // 抛出错误提示
                    ElMessage({ type: 'error', message: res.message })
                    return Promise.reject(new Error(res.message || 'Error'))
                }
                return res
            },
            error => {
                // 所有的响应异常 区分来源为取消请求/非取消请求
                error.isCancelRequest = axios.isCancel(error)
                console.log(`err${error}`) // for debug

                return Promise.reject(error)
            }
        )
    }

    // 请求工具函数
    public requestConfig<T>(options: AxiosRequest): Promise<T> {
        const config: any = { headers: {} }
        if (options.contentType) {
            config.headers['Content-Type'] = options.contentType
        }
        if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded' && config.data) {
            config.data = qs.stringify(config.data)
        }
        const newConfig = Object.assign(config, options)
        return new Promise<T>((resolve, reject) => {
            Request.axiosInstance.request(newConfig)
                .then((res: any) => resolve(res))
                .catch(err => reject(err))
        })
    }
}


export const request = new Request()

export const { requestConfig } = request
