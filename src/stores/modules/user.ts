import { defineStore } from 'pinia'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { reactive } from 'vue'
import { getInfoApi, loginApi, logoutApi } from '@/api/user'
import { resetRouter } from '@/router'
import { useRequest } from 'vue-request'

import { AxiosResponse } from 'axios'

interface IState {
    token?: string,
    userInfo: {
        [key: string]: any
    } | null
}


export const useUserStore = defineStore('user', () => {

    const initialState = (): IState => ({
        token: getToken(),
        userInfo: null
    })

    const userState = reactive<IState>(initialState())


    const setState = (key: keyof IState, value: string | object) => {
        if (Object.getOwnPropertyDescriptor(userState, key)) {
            if (key === 'token' ) {
                userState[key] = value as string
            } else {
                userState[key] = value as object
            }
        }
    }

    const reset = () => {
        Object.assign(userState, initialState())
    }

    const loginRequest = useRequest(loginApi, { manual: true })

    const login = (userInfo: { account: string, password: string }) => {
        const { account, password } = userInfo
        return new Promise( (resolve, reject) => {
            loginRequest.run({ account: account.trim(), password }).then(res => {
                const { data } = res as any
                setState('token', data.token)
                setToken(data.token)
                resolve(data)
            })
                .catch(err => reject(err))
        })
    }

    const getInfo = () => new Promise((resolve, reject) => {
        getInfoApi(<string>userState?.token).then((response: AxiosResponse | any) => {
            const { data } = response
            if (!data) {
                return reject('Verification failed, please Login again.')
            }
            setState('userInfo', data)
            resolve(data)
        })
            .catch((error: any) => {
                reject(error)
            })
    })


    const logout = (callback: () => any) => new Promise<void>((resolve, reject) => {
        logoutApi(<string>userState?.token).then(() => {
            callback && callback()
            removeToken() // must remove  token  first
            resetRouter()
            reset()
            resolve()
        })
            .catch((error: any) => {
                reject(error)
            })
    })

    const resetToken = () => new Promise<void>(resolve => {
        removeToken() // must remove  token  first
        reset()
        resolve()
    })
    return { userState, login, getInfo, logout, resetToken }
})
