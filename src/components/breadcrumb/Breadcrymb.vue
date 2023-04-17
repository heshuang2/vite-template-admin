<template>
    <div v-if="levelList.length !== 0" class="breadcrumb h-flex-x h-flex-space"
         :style="{'border-bottom': activeMenu ? 'none': '1px solid #E8E8E8;'}">
        <el-breadcrumb class="app-breadcrumb " separator="/">
            <transition-group name="breadcrumb">
                <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
                    <span v-if="item.redirect==='noRedirect'||index===levelList.length-1"
                          class="no-redirect">{{ item.meta.title }}</span>
                    <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
    </div>
</template>

<script setup>
import { pathToRegexp } from 'path-to-regexp'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const currentRouter = useRoute()
const router = useRouter()
const levelList = ref(null)
const activeMenu = ref(null)

const getBreadcrumb = () => {
    const matched = currentRouter.matched.filter(item => item.meta && item.meta.title)
    const first = matched[0]
    if (currentRouter.meta.activeMenu) {
        const active = currentRouter.meta.activeMenu.substring(currentRouter.meta.activeMenu.lastIndexOf('/') + 1, this.$route.meta.activeMenu.length)
        const activeParent = currentRouter.options.routes.filter(item => item.path === first.parent.path)
        activeMenu.value = activeParent[0].children.filter(item => item.path === active)[0]
        // this.activeMenu = this.$router.options.routes.filter(item => item.path === active)[0];
    } else {
        activeMenu.value = null
    }

    /*
     * if (!this.isDashboard(first)) {
     *  matched = [{ path: '/home', meta: { title: '首页' } }].concat(matched);
     * }
     */
    levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    // eslint-disable-next-line no-unused-expressions
    currentRouter.meta.activeMenu && levelList.value.splice(0, 0, activeMenu.value)
}

getBreadcrumb()

watch(() => currentRouter.fullPath, () => getBreadcrumb())

const pathCompile = path => {
    // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    const { params } = currentRouter
    const toPath = pathToRegexp.compile(path)
    return toPath(params)
}

const handleLink = item => {
    const { redirect, path } = item
    if (redirect && !currentRouter.meta.activeMenu) {
        router.push(redirect)
        return
    } else if (currentRouter.meta.activeMenu && item.path !== '/home') {
        this.$router.push(currentRouter.meta.activeMenu)
        return
    }
    this.$router.push(pathCompile(path))
}

</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
}
</style>
