import { createApp } from 'vue'

import App from './App.vue'
import { setupPlugins } from '@/utils/plugin'
import { setupRouter } from '@/router'

import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/css/index.scss'
import '@purge-icons/generated' // icon css
import 'uno.css'

const app = createApp(App)


setupPlugins(app)
setupRouter(app)

app.mount('#app')

