import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// rollup打包分析插件, build后会在根目录产生一个stats.html文件
import visualizer from 'rollup-plugin-visualizer'

import { configHtmlPlugin } from './html'
import { uno_css } from './unocss'
import autoImport from './autoImport'

import { viteMockServe } from 'vite-plugin-mock'

export function createVitePlugins(viteEnv: ImportMetaEnv, isBuild: boolean) {
    const plugins = [
        vue(),
        configHtmlPlugin(viteEnv, isBuild),
        // * vite 可以使用 jsx/tsx 语法
        vueJsx(),
        uno_css(),
        // 配置mock.js
        viteMockServe({ mockPath: 'mock', localEnabled: true })
    ]

    autoImport(plugins)

    if (isBuild) {
        plugins.push(visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
        }))
    }

    return plugins
}
