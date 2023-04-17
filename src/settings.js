import { ref } from 'vue'

export const title = 'Vue Admin Template'


/**
 * @type {boolean} true | false
 * @description Whether fix the header
 */
export const fixedHeader = ref(true)

/**
 * @type {boolean} true | false
 * @description Whether show the logo in sidebar
 */
export const sidebarLogo = ref(true)

export const showSettings = true

// 主题颜色
export const themeList = [
    '#409eff',
    '#F5222D',
    '#FA541C',
    '#FAAD32',
    '#13C2C2',
    '#52C41A',
    '#2F54EB',
    '#722ED1'
]
