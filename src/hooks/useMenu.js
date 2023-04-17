import { ref } from 'vue'
import router from '@/router'
import { useStorage } from '@vueuse/core'

class Menu {
    menus = ref([])
    history = useStorage('history_menu', [])
    route = ref(null)
    close = useStorage('menu_close_state', false)

    constructor() {
        this.menus.value = this.getMenuByRoute()
        this.history.value = this.getHistoryMenu()
    }

    getMenuByRoute() {
        return router
            .getRoutes()
            .filter(route => route.children.length && route.meta)
            .map(route => {
                const menu = { ...route.meta }
                menu.title = route.children
                    .filter(route => route.meta)
                    .map(route => ({ ...route.meta, route: route.name }))
                return menu
            })
            .filter(menu => menu.children?.length)
    }

    getHistoryMenu() {
        const routes = []
        router.getRoutes().map(r => routes.push(...r.children))

        return this.history.value.filter(m => routes.some(r => r.name === m.route))
    }

    removeHistoryMenu(menu) {
        const index = this.history.value.indexOf(menu)
        this.history.value.splice(index, 1)
    }

    addHistoryMenu(route) {
        if (!route.meta) return
        this.route.value = route

        const menu = { ...route.meta, route: route.name }
        const isHas = this.history.value.some(menu => menu.route === route.name)
        !isHas && this.history.value.unshift(menu)
        if (this.history.value.length > 10) {
            this.history.value.pop()
        }
    }

}

export default Menu
