const docStyle = document.querySelector('body').style
const prefix = '--el-color-primary'
// 白色混合色
const mixWhite = '#ffffff'
// 黑色混合色
const mixBlack = '#000000'

const colorMix = (color1, color2, weight) => {
    weight = Math.max(Math.min(Number(weight), 1), 0)
    const r1 = parseInt(color1.substring(1, 3), 16)
    const g1 = parseInt(color1.substring(3, 5), 16)
    const b1 = parseInt(color1.substring(5, 7), 16)
    const r2 = parseInt(color2.substring(1, 3), 16)
    const g2 = parseInt(color2.substring(3, 5), 16)
    const b2 = parseInt(color2.substring(5, 7), 16)
    let r = Math.round(r1 * (1 - weight) + r2 * weight)
    let g = Math.round(g1 * (1 - weight) + g2 * weight)
    let b = Math.round(b1 * (1 - weight) + b2 * weight)
    r = `0${(r || 0).toString(16)}`.slice(-2)
    g = `0${(g || 0).toString(16)}`.slice(-2)
    b = `0${(b || 0).toString(16)}`.slice(-2)
    return `#${r}${g}${b}`
}


// 根据不同的主题类型 获取不同主题数据

export const switchTheme = color => {
    docStyle.setProperty(prefix, color)
    docStyle.setProperty('--menu-active-bg', color)
    docStyle.setProperty('--menu-active-text', color)

    for (let i = 1; i < 10; i += 1) {
        docStyle.setProperty(`${prefix}-light-${i}`, colorMix(color, mixWhite, i * 0.1))
    }
    docStyle.setProperty('--el-color-primary-dark-2', colorMix(color, mixBlack, 0.2))
    // 本地缓存style，样式持久化，你也可以存在后端
    localStorage.setItem('theme', color)
}

