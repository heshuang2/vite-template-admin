<template>
    <sidebar-item-link
        v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow && onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
            <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"/>
            <template #title>
                <span style="font-size: 16px;">{{ onlyOneChild.meta.title }}</span>
            </template>
        </el-menu-item>
    </sidebar-item-link>
    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)">
        <template #title>
            <item v-if="item.meta" :icon="item.meta && item.meta.icon"/>
            <span v-if="item.meta && item.meta.title" style="font-size: 16px;">{{ item.meta.title }}</span>
        </template>
        <sidebar-item
            v-for="child in item.children"
            :key="child.path"
            :is-nest="true"
            :item="child"
            :base-path="resolvePath(child.path)"
            class="nest-menu"
        />
    </el-sub-menu>
</template>

<script setup>

/**
 * @param description: 侧边栏item
 */

import { defineProps, ref } from 'vue'
import path from 'path-browserify' // 使用 path-browserify 代替 path 模块, vite 源码中设定了不允许在客户端代码中访问内置模块代码
import { isExternal } from '@/utils/validate/modules/validate-format'

import Item from '@/layout/components/Sidebar/Item.vue'
import SidebarItemLink from '@/layout/components/Sidebar/SidebarItemLink.vue'

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    isNest: {
        type: Boolean,
        default: false
    },
    basePath: {
        type: String,
        default: ''
    }
})

const onlyOneChild = ref(null)

const hasOneShowingChild = (children = [], parent) => {
    const showingChildren = children.filter(item => {
        if (item.hidden) {
            return false
        }
        // Temp set(will be used if only has one showing child)
        onlyOneChild.value = item
        return true

    })

    // When there is only one child router, the child router is displayed by default
    if (showingChildren.length === 1) {
        return true
    }

    // Show parent if there are no child router to display
    if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
        return true
    }

    return false
}

const resolvePath = routePath => {
    if (isExternal(routePath)) {
        return routePath
    }
    if (isExternal(props.basePath)) {
        return props.basePath
    }
    return path.resolve(props.basePath, routePath)
}

</script>

<style scoped>
::v-deep .el-menu-item {
    line-height: unset;
}
</style>
