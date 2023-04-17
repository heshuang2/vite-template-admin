import { RouteLocationNormalized, NavigationGuardNext, Router } from 'vue-router'
import { getToken } from '@/utils/auth'

import nProgress from '@/utils/progress'
import 'nprogress/nprogress.css'

import { useUserStore } from '@/stores/modules/user'

const run = (router: Router) => {
    router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
        const userStore = useUserStore()
        const { userState } = storeToRefs(userStore)
        const { getInfo } = userStore
        nProgress.start()
        const hasToken = getToken()
        // 无需 token 可访问路由
        if (to.meta?.guest) return next()
        if (hasToken) {
            // 是否存在 用户信息
            if (!userState.value.userInfo) {
                getInfo()
            }
            next()
        } else {
            next(`/login?redirect=${to.fullPath}`)
        }
    })

    router.afterEach(() => nProgress.done())
}


export default (router: Router) => run(router)

