<template>
    <section class="app-main">
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component"/>
            </transition>
        </router-view>
    </section>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.app-main {
    /*50 = navbar  */
    min-height: 100vh;
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: $appBg;
}
.fixed-header+.app-main {
    padding-top: 96px;
}

// fix css style bug in open el-dialog
.el-popup-parent--hidden {
    .fixed-header {
        padding-right: 15px;
    }
}
</style>
