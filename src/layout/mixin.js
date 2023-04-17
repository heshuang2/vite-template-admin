import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/modules/app'
import { useSettingsStore } from '@/stores/modules/settings'
import { useUserStore } from '@/stores/modules/user'
import { getToken } from '@/utils/auth'

const { body } = document
const WIDTH = 992 // 参考 Bootstrap 的响应式设计

export default () => {
    const appStore = useAppStore()
    const settingsStore = useSettingsStore()
    const userStore = useUserStore()
    const { sidebar, device } = storeToRefs(appStore)
    const { settingState } = storeToRefs(settingsStore)
    const { userState } = storeToRefs(userStore)

    const { closeSideBar, toggleSideBar, toggleDevice } = appStore
    const { changeSetting } = settingsStore
    const { getInfo, logout } = userStore

    const watchRouter = () => {
        const currentRouter = useRoute()
        watch(() => currentRouter.name, () => {
            if (device.value === 'mobile' && sidebar.opened) {
                closeSideBar(false)
            }
        })
    }

    const isMobile = () => {
        const rect = body.getBoundingClientRect()
        return rect.width - 1 < WIDTH
    }

    const resizeMounted = () => {
        if (isMobile()) {
            toggleDevice('mobile')
            closeSideBar(false)
        }
    }

    const resizeHandler = () => {
        if (!document.hidden) {
            const status = isMobile()
            toggleDevice(status ? 'mobile' : 'desktop')
            if (status) {
                closeSideBar(true)
            }
        }
    }

    // 监听窗口大小改变时发生的事件 宽度 or 高度
    const addEventListenerOnResize = () => {
        window.addEventListener('resize', resizeHandler)
    }

    const removeEventListenerOnResize = () => {
        window.removeEventListener('resize', resizeHandler)
    }


    // 获取用户信息
    const getUserInfo = () => {
        if (!userState.value.userInfo) {
            getInfo(getToken())
        }
    }


    return {
        sidebar,
        device,
        settingState,
        userState,
        watchRouter,
        resizeMounted,
        addEventListenerOnResize,
        removeEventListenerOnResize,
        closeSideBar,
        toggleSideBar,
        changeSetting,
        logout,
        getUserInfo
    }
}
