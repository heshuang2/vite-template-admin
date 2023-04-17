<template>
    <div class="history p-2">
        <el-tag
            v-for="tag in menuService.history.value"
            :key="tag.title"
            size="large"
            :type="activeHistory === tag.route ? '' : 'info'"
            :closable="activeHistory !== tag.route"
            class="mx-2 cursor-pointer"
            @close="handleClose(tag)"
            @click="$router.push({ name: tag.route })">
            {{ tag.title }}
        </el-tag>
    </div>
</template>

<script setup>
import Menu from '@/hooks/useMenu'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const menuService = new Menu()
const route = useRoute()

// 当前路由
const activeHistory = ref('')

watch(route, () => {
    menuService.addHistoryMenu(route)
    activeHistory.value = route.name
}, { immediate: true })

const handleClose = tag => {
    menuService.removeHistoryMenu(tag)
}

</script>

<style lang="scss" scoped>
.history {
    background-color: $navbarBg;
    border: 1px solid $borderColor;
}
</style>
