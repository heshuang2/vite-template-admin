import { defineStore } from 'pinia'
import { showSettings, fixedHeader, sidebarLogo } from '@/settings'
import { reactive } from 'vue'

export const useSettingsStore = defineStore('settings', () => {

    const initialState = {
        showSettings,
        fixedHeader,
        sidebarLogo
    }

    const settingState = reactive(initialState)

    const changeSetting = (key, status) => {
        if (Object.getOwnPropertyDescriptor(settingState, key)) {
            settingState[key] = status
        }
    }

    return { settingState, changeSetting }
})
