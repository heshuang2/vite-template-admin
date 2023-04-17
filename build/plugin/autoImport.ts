/**
 * * 组件库按需引入插件
 * usage: 直接使用组件,无需在任何地方导入组件
 */

import { Plugin } from 'vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import PurgeIcons from 'vite-plugin-purge-icons'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function autoImport(plugins: Plugin[]) {
    plugins.push(
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia'],
            eslintrc: {
                enabled: true, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成，一旦生成配置文件之后，最好把enable关掉，即改成false。否则这个文件每次会在重新加载的时候重新生成，这会导致eslint有时会找不到这个文件。当需要更新配置文件的时候，再重新打开
                filepath: './.eslintrc-auto-import.json',
                globalsPropValue: true
            },
            dts: 'src/auto-import.d.ts', // 生成 `auto-import.d.ts` 全局声明
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [
                ElementPlusResolver({ importStyle: 'sass' }),
            ]
        }),
        PurgeIcons({ content: ['**/*.html', '**/*.ts', '**/*.js', '**/*.vue'] }),
    )
}
