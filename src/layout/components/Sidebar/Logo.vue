<template>
    <div
        class="sidebar-logo-container"
        :class="{'collapse': props.collapse}"
    >
        <transition name="sidebarLogoFade">
            <router-link
                v-if="false"
                key="collapse"
                class="sidebar-logo-link"
                to="/"
            >
                <img
                    src="favicon.ico"
                    class="sidebar-logo"
                >
            </router-link>
            <router-link
                v-else
                key="expand"
                class="sidebar-logo-link"
                to="/"
            >
                <img
                    src="favicon.ico"
                    class="sidebar-logo"
                >
                <h1 class="sidebar-title">
                    {{ title }}
                </h1>
            </router-link>
        </transition>
    </div>
</template>

<script setup>
import { title } from '@/settings'

const props = {
    collapse: {
        type: Boolean,
        default: true
    }
}

</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
    opacity: 0;
}

.sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #ffffff;
    text-align: center;
    overflow: hidden;

    & .sidebar-logo-link {
        height: 100%;
        width: 100%;

        & .sidebar-logo {
            width: 32px;
            height: 32px;
            vertical-align: middle;
            margin-right: 12px;
        }

        & .sidebar-title {
            display: inline-block;
            color: $menuActiveBg;
            font-weight: 600;
            line-height: 50px;
            font-size: 14px;
            font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
            vertical-align: middle;
            margin: 0 0 0 10px;
        }
    }

    &.collapse {
        .sidebar-logo {
            margin-right: 0;
        }
    }
}
</style>
