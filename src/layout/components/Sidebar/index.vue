<template>
    <div :class="{'has-logo':showLogo}">
        <!-- 侧边栏logo(需要跟随侧边栏折叠) -->
        <logo v-if="showLogo" :collapse="sidebar.opened" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="!sidebar.opened"
                :background-color="variablesCss.menuBg"
                :text-color="variablesCss.menuText"
                :unique-opened="false"
                :active-text-color="variablesCss.menuActiveText"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import mixins from '@/layout/mixin'

import Logo from '@/layout/components/Sidebar/Logo.vue'
import SidebarItem from '@/layout/components/Sidebar/SidebarItem.vue'
import variables from '@/assets/css/variables.module.scss'

const { sidebar, settingState } = mixins()

const showLogo = computed(() => settingState.value.sidebarLogo)

const route = useRoute()

const activeMenu = computed(() => {
    const { meta, path } = route
    if (meta.activeMenu) {
        return meta.activeMenu
    }
    return path
})

const variablesCss = computed(() => variables)

const router = useRouter()
const routes = computed(() => router.options.routes.filter(item => !item?.hidden))

</script>

<style scoped>
</style>
