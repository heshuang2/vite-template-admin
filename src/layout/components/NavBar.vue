<template>
    <div class="navbar">
        <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

        <breadcrymb class="breadcrumb-container" />

        <div class="right-menu">
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <img :src="avatar +'?imageView2/1/w/80/h/80'" class="user-avatar">
                    <i class="el-icon-caret-bottom" />
                </div>
                <template #dropdown>
                    <el-dropdown-menu class="user-dropdown">
                        <router-link to="/home">
                            <el-dropdown-item>
                                Home
                            </el-dropdown-item>
                        </router-link>
                        <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
                            <el-dropdown-item>Github</el-dropdown-item>
                        </a>
                        <el-dropdown-item divided  @click="handleLogout">
                            <span style="display:block;">退出登录</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useRoute, useRouter } from 'vue-router'
import mixins from '@/layout/mixin'
import Hamburger from '@/components/hamburger/Hamburger.vue'
import Breadcrymb from '@/components/breadcrumb/Breadcrymb.vue'

const currentRoute = useRoute()
const router = useRouter()
const { sidebar, toggleSideBar, userState, logout } = mixins()


const avatar = computed(() => userState.value.userInfo?.avatar)

const handleLogout = () => {
    logout(() => {
        ElMessage({ type: 'success', message: '退出成功' })
        router.push(`/login?redirect=${currentRoute.fullPath}`)
    })
}

</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: $navbarBg;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;

        //&:hover {
        //    background: rgba(0, 0, 0, .025)
        //}
    }

    .breadcrumb-container {
        float: left;
        display: flex;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background .3s;

                &:hover {
                    background: rgba(0, 0, 0, .025)
                }
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
