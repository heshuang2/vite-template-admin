import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes = [
    {
        path: '/login',
        component: () => import('@/pages/login/Login.vue'),
        hidden: true,
        meta: { guest: true }
    },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import('@/pages/home/Home.vue'),
                meta: { title: '首页', icon: 'ep:home-filled' }
            }
        ]
    },
    {
        path: '/example',
        component: Layout,
        redirect: '/example/table',
        meta: { title: 'Example', icon: 'ep:comment' },
        children: [
            {
                path: 'table',
                name: 'Table',
                component: () => import('@/pages/example/Table.vue'),
                // hidden: true,
                meta: { title: '表格', icon: 'ep:menu' },
            },
            {
                path: 'tree',
                name: 'Tree',
                component: () => import('@/pages/example/TreeTable.vue'),
                meta: { title: '树形表格', icon: 'ep:add-location' },
            }
        ]
    },

    /*
     *{
     *  path: '/form',
     *  component: Layout,
     *  children: [
     *      {
     *          path: 'index',
     *          name: 'Form',
     *          meta: { title: 'Form', icon: 'ep:add-location' },
     *          hidden: true
     *      }
     *  ]
     *},
     */
] as RouteRecordRaw[]

export default routes
