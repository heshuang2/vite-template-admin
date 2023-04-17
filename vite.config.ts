import { defineConfig, loadEnv } from 'vite'
import alias from './build/alias'

import { wrapperEnv, createProxy } from './build/utils'
import { createVitePlugins } from './build/plugin'


// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const isBuild = command === 'build'
    const env = loadEnv(mode, process.cwd())
    const viteEnv = wrapperEnv(env) as ImportMetaEnv
    // 拿到.env 和 .env.development/production中定义的环境变量
    const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv

    return {
        plugins: createVitePlugins(viteEnv, isBuild),
        base: VITE_PUBLIC_PATH || '/', // 公共路径
        resolve: {
            // 设置路径别名
            alias,
            extensions: ['.ts', '.js', '.vue', '.json']
        },
        css: {
            preprocessorOptions: {
                // define global scss variable
                scss: { additionalData: '@use \'@/assets/css/variables.scss\' as * ;' }
            }
        },
        server: {
            host: '0.0.0.0', // 默认为'127.0.0.1'，如果将此设置为 `0.0.0.0` 或者 `true` 将监听所有地址，包括局域网和公网地址
            port: VITE_PORT, // 端口
            proxy: createProxy(VITE_PROXY), // 代理
        }
    }
})
