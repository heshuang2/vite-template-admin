<template>
    <a
        v-if="isExternal(to)"
        :href="to"
        target="_blank"
        rel="noopener"
    >
        <slot />
    </a>
    <div
        v-else
        @click="push"
    >
        <slot />
    </div>
</template>

<script setup>

import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { isExternal } from '@/utils/validate/modules/validate-format'

const props = defineProps({
    to: {
        type: [String, Boolean],
        default: true
    }
})


const router = useRouter()
const push = () => {
    console.log(props.to)
    router.push(props.to).catch(err => {
        console.log(err)
    })
}

</script>

<style scoped>
</style>
