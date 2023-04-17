import { requestConfig } from '@/request'

export function loginApi(data: any) {
    return requestConfig({
        url: '/vue-admin-template/user/login',
        method: 'post',
        data
    })
}

export function getInfoApi(token: string) {
    return requestConfig({
        url: '/vue-admin-template/user/info',
        method: 'get',
        params: { token }
    })
}

export function logoutApi(data: any) {
    return requestConfig({
        url: '/vue-admin-template/user/logout',
        method: 'post',
        data
    })
}
