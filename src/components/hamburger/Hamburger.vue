<template>
    <div
        :class="[{'is-active': isActive}]"
        class="hamburger"
        @click="toggleClick"
    >
        <span class="hamburger-content">
<!--            <Icon v-if="isActive" icon="line-md:menu-fold-right" />-->
            <Icon icon="line-md:menu-fold-right" height="25" />
        </span>
    </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
import { Icon } from '@iconify/vue'

defineProps({
    isActive: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['toggleClick'])

const toggleClick = () => {
    emit('toggleClick')
}

</script>

<style lang="scss" scoped>
.hamburger {
    display: flex;
    align-items: center;
    vertical-align: middle;
    width: 35px;
    
    &-content {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        cursor: pointer;
        transition: background .3s;
        -webkit-tap-highlight-color:transparent;
        
        &:hover {
            background-color: rgba(0, 0, 0, 0.04);
        }
    }
}

.hamburger.is-active {
    transform: rotate(180deg);
}
</style>
