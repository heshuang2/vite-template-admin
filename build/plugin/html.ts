// 集成 vite-plugin-html 主要是为了对 index.html 进行压缩和注入动态数据，例如替换网站标题和cdn

import html from 'vite-plugin-html'

export function configHtmlPlugin(viteEnv: ImportMetaEnv, isBuild: boolean) {
    const { VITE_APP_TITLE } = viteEnv

    return html({
        minify: isBuild,
        inject: { data: { title: VITE_APP_TITLE } },
    })
}
