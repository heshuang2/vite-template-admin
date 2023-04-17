import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import Cookies from 'js-cookie'


export const useAppStore = defineStore('app', () => {
    // 初始值
    const initialState = {
        sidebar: {
            opened: Cookies.get('sidebarStatus') ? !!Number(Cookies.get('sidebarStatus')) : true,
            withoutAnimation: false
        },
        device: 'desktop'
    }

    /**
     * sidebar: opened 侧边菜单栏状态
     * 侧边导航栏折叠/展开
     */
    const sidebar = reactive(initialState.sidebar)

    const toggleSideBar = (): void => {
        sidebar.opened = !sidebar.opened
        sidebar.withoutAnimation = false
        if (sidebar.opened) {
            Cookies.set('sidebarStatus', String(1))
        } else {
            Cookies.set('sidebarStatus', String(0))
        }
    }

    const closeSideBar = (status: boolean): void => {
        Cookies.set('sidebarStatus', String(0))
        sidebar.opened = false
        sidebar.withoutAnimation = status
    }

    /**
     * device: pc or mobile
     * 窗口设备判断
     */
    const device = ref(initialState.device)

    const toggleDevice = (status: string): void => {
        device.value = status
    }

    return { sidebar, toggleSideBar, closeSideBar, device, toggleDevice }
})
