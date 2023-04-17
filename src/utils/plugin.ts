import { App } from 'vue'
import { setupPinia } from '@/stores'

export function setupPlugins(app: App) {
    setupPinia(app)
}
