<template>
    <div v-if="columns.length" class="table-search bg-white p-5 mb-4 rounded overflow-hidden">
        <el-form
            ref="formRef"
            :model="searchParams"
            :inline="option.inline"
            :label-width="option.labelWidth"
            :label-position="option.labelPosition"
            :label-suffix="option.labelSuffix"
            :size="option.size"
            :style="`max-width: ${maxWidth}px`">
            <template v-for="item in getSearchList" :key="item.prop">
                <el-form-item :label="`${item.label} :`">
                    <SearchFormItem :item="item" :search-params="searchParams" v-bind="$attrs"/>
                </el-form-item>
            </template>
            <div style="float: right">
                <el-button type="primary" :loading="searchLoading" @click="handleSearch">查询</el-button>
                <el-button @click="handleReset">重置</el-button>
            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts">

import { PropType } from 'vue'
import { IColumns, IFormOption } from '@/components/proTable/type/proTablle.d.'
import SearchFormItem from '@/components/searchForm/components/SearchFormItem.vue'

const props = defineProps({
    columns: { type: Array as PropType<Partial<IColumns[]>>, default: () => [] },
    searchParams: { type: Object as PropType<any>, default: () => ({}) },
    formOption: { type: Object as PropType<Partial<IFormOption>>, default: () => ({}) },
    searchLoading: { type: Boolean, default: () => false }
})

const emit = defineEmits(['search', 'reset'])

onMounted(() => {

    /*
     * * 暂时只判断这两种情况（第四个搜索项为时间/日期范围 || 前三项存在时间/日期范围选择框）
     * * 后期通过 css 解决文本框自适应宽度变化，已经实现了像 antd 中 pro-table 一样的样式，但自我感觉不太好看，所以没采用😆
     */
    if (props.columns.length >= 4) {
        const searchTypeArr = ['datetimeRange', 'dateRange']
        searchTypeArr.includes(props.columns[3]?.searchType as string) ? (maxWidth.value = 945, maxLength.value = 3) : null
        props.columns.slice(0, 3).forEach(item => {
            searchTypeArr.includes(item?.searchType as string) ? (maxWidth.value = '100%', maxLength.value = 3) : null
        })
    }
})


// 搜索项未展开最长长度
const maxLength = ref<number>(4)
const maxWidth = ref<number | string>('100%')

// 是否展开搜索项
const searchShow = ref<boolean>(false)

// 根据是否展开配置搜索项长度
const getSearchList = computed((): Partial<IColumns>[] => {
    if (searchShow.value) return props?.columns as Partial<IColumns>[]
    return props.columns.slice(0, maxLength.value) as Partial<IColumns>[]
})

// searchFormOption 合并
const option = computed(() => Object.assign({
    inline: true,
    labelWidth: 100,
    labelPosition: 'right',
    labelSuffix: '',
    size: 'default'
}, props.formOption))


// 查询
const handleSearch = () => {
    emit('search')
}
// 重置
const handleReset = () => {
    emit('reset')
}

</script>

<style scoped>
</style>
