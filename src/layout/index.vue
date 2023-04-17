<template>
    <div :class="classObj" class="app-wrapper">
        <div v-if="isDrawerBg" class="drawer-bg" @click="handleClickOutside" />
        <side-bar class="sidebar-container" />
        <div class="main-container">
            <div :class="{'fixed-header':fixedHeader}">
                <nav-bar />
                <history />
            </div>
            <app-main />
        </div>
        <setting />
    </div>
</template>

<script setup>
import AppMain from './components/AppMain.vue'
import NavBar from '@/layout/components/NavBar.vue'
import SideBar from '@/layout/components/Sidebar/index.vue'
import History from '@/components/history/History.vue'

import { computed, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
import Setting from '@/layout/components/setting/Setting.vue'
import mixins from '@/layout/mixin'

const { sidebar, device, settingState, watchRouter, resizeMounted, addEventListenerOnResize, removeEventListenerOnResize, closeSideBar } = mixins()

const classObj = computed(() => ({
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
    mobile: device.value === 'mobile'
}))

// mobile 菜单展开遮罩层
const isDrawerBg = computed(() => device.value === 'mobile' && sidebar.value.opened)

const handleClickOutside = () => {
    closeSideBar(false)
}

const fixedHeader = computed(() => settingState.value.fixedHeader)

watchRouter()

onBeforeMount(() => {
    addEventListenerOnResize()
})

onBeforeUnmount(() => {
    removeEventListenerOnResize()
})

onMounted(() => {
    resizeMounted()
})

</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
        position: fixed;
        top: 0;
    }
}
.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
}

.hideSidebar .fixed-header {
    width: calc(100% - 64px)
}

.mobile .fixed-header {
    width: 100%;
}
</style>
