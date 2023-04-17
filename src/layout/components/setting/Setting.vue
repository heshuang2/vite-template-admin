<template>
    <div class="setting">
        <div class="setting_content" :style="{right: isDrawer ? '250px' : '0'}" @click="handleOpen">
            <span class="setting_content_icon" :class="{'setting-icon': !isDrawer}">
                <Icon :icon="isDrawer ? 'ep:close' : 'ep:setting'" />
            </span>
        </div>
        <div class="setting_right" :style="{width: isDrawer ? '298px': '0'}"/>
    </div>
    <el-drawer
        v-model="isDrawer"
        title="设置"
        direction="rtl"
        :size="250"
        :before-close="handleClose"
        ref="drawer"
    >
        <h3 class="setting-title">主题色</h3>
        <div class="theme-color">
            <div v-for="(theme, themeIndex) in themeList" class="theme-color-block"
                 :key="themeIndex" :style="{'background-color': theme}" @click="changeTheme(theme)">
                <span class="theme-icon" :class="{'theme-icon-check': true}">
                    <Icon v-if="activeTheme === theme" icon="ep:select"/>
                </span>
            </div>
        </div>
        <div class="py-6">
            <div class="my-6 flex justify-between items-center">
                <span>固定header</span>
                <el-switch v-model="fixedHeader" />
            </div>
            <div class="my-6 flex justify-between items-center">
                <span>logo显示</span>
                <el-switch v-model="sidebarLogo" />
            </div>
        </div>
    </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Icon } from '@iconify/vue'
import { switchTheme } from '@/utils/theme'
import { themeList, sidebarLogo, fixedHeader } from '@/settings'

// 抽屉开关
const isDrawer = ref(false)

const handleOpen = () => {
    isDrawer.value = !isDrawer.value
}
const handleClose = () => {
    isDrawer.value = false
}

// 当前主题颜色
const activeTheme = ref<string | null>(null)

activeTheme.value = localStorage.getItem('theme') ?? themeList.at(0)
switchTheme(activeTheme.value)

const changeTheme = (theme: string): void => {
    switchTheme(theme)
    activeTheme.value = theme
}


</script>

<style lang="scss" scoped>
.setting {
    position: fixed;
    top: 240px;
    right: 0;
    z-index: 9;
    
    &_content {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        font-size: 16px;
        text-align: center;
        background-color: $menuActiveText;
        border-radius: 4px 0 0 4px;
        cursor: pointer;
        pointer-events: auto;


        &_icon {
            color: $subMenuActiveText;
            font-size: 32px;
            height: 32px;
            line-height: 32px;
        }

        &:hover {
            .setting-icon {
                transform: rotate(180deg);
                transition: transform 0.5s linear;
                transition-delay: .1s;
            }
        }
    }

    &_right {
        transition: width .3s;
    }
}


.setting-title {
    margin-bottom: 12px;
    font-size: 14px;
    line-height: 22px;
    font-weight: 500;
}

.theme-color {
    margin: 16px 0;
    overflow: hidden;

    &-block {
        float: left;
        width: 20px;
        height: 20px;
        margin-top: 6px;
        margin-right: 6px;
        color: #fff;
        font-weight: 700;
        text-align: center;
        border-radius: 2px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}


</style>
