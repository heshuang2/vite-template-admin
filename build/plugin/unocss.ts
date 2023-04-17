/*
 * UnoCSS - 具有高性能且极具灵活性的即时原子化 CSS 引擎。
 * https://antfu.me/posts/reimagine-atomic-css-zh
 */

import unoCss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'

export function uno_css(): any {
    return unoCss({ presets: [presetUno(), presetAttributify(), presetIcons()] })
}
