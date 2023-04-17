import * as VueRouter from 'vue-router'
import routes from './routes'
import guard from '@/router/guard'

import { App } from 'vue'


const createRouter = () => VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    // history: createWebHistory(), // history 路由模式
    scrollBehavior: (): {} => ({ y: 0 }),
    routes, // `routes: routes` 的缩写
})

const router = createRouter()

export function setupRouter(app: App) {
    guard(router)
    app.use(router)
}

// 去除重复路由报错的问题
const originalPush = router.push
router.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 重置路由
export function resetRouter() {
    const newRouter = createRouter()
    router.resolve = newRouter.resolve
}

export default router
