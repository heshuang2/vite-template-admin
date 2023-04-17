<template>
    <el-icon :size="25">
        <Icon :icon="icon"/>
    </el-icon>
</template>

<script>

/**
 * @param description: MenuItem
 */

import { defineComponent } from 'vue'

import { Icon } from '@iconify/vue'


export default defineComponent({
    components: { Icon },
    props: {
        icon: {
            type: String,
            default: ''
        },
    },
})
</script>

<style scoped>

.title {
    display: block;
    font-size: 16px;
    vertical-align: text-bottom;
}
</style>
