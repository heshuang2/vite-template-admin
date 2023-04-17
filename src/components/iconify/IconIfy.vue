<template>
    <span class="iconify" :data-icon="icon" :data-width="size" :data-height="size" />
</template>

<script setup>
defineProps({
    icon: {
        type: String,
        default: () => ''
    },
    size: {
        type: String,
        default: () => '100'
    }
})

</script>

<style scoped>
</style>
