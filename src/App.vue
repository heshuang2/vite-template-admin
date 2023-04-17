<template>
    <el-config-provider :locale="locale">
        <router-view msg v-slot="{ Component }">
            <component :is="Component"/>
        </router-view>
    </el-config-provider>
</template>

<script setup>
import {useDark, useToggle} from '@vueuse/core'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const locale = zhCn
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style lang="scss" scoped></style>
