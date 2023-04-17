<template>
    <div v-if="!item.searchType || item.searchType === 'text'" style="width: 210px;">
        <el-input v-model="params[item.prop]" v-bind="item.searchProp" :clearable="clearable(item)" />
    </div>
    <!-- 下拉选择 -->
    <template v-if=" item.searchType === 'select' || item.searchType === 'multipleSelect'">
        <el-select
            v-model="params[item.prop]"
            v-bind="item.searchProps"
            :multiple="item.searchType === 'multipleSelect'"
            placeholder="请选择"
            :clearable="clearable(item)"
        >
            <el-option
                v-for="itemValue in item.enum"
                :key="itemValue[item.searchProps?.value] ?? itemValue.value"
                :label="itemValue[item.searchProps?.label] ?? itemValue.label"
                :value="itemValue[item.searchProps?.value] ?? itemValue.value"
                :disabled="itemValue.disabled"
            />
        </el-select>
    </template>
    <!-- 日期选择 -->
    <template v-if="item.searchType === 'date'">
        <el-date-picker
            v-model="params[item.prop]"
            v-bind="item.searchProps"
            value-format="YYYY-MM-DD"
            type="date"
            placeholder="请选择日期"
            :clearable="clearable(item)"
        />
    </template>
    <!-- 时间范围选择 -->
    <template v-if="item.searchType === 'timeRange'">
        <el-time-picker
            v-model="params[item.prop]"
            v-bind="item.searchProps"
            is-range
            value-format="HH:mm:ss"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :clearable="clearable(item)"
        />
    </template>
    <!-- 日期范围选择 -->
    <template v-if="item.searchType === 'dateRange'">
        <el-date-picker
            v-model="params[item.prop]"
            v-bind="item.searchProps"
            type="daterange"
            value-format="YYYY-MM-DD"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :clearable="clearable(item)"
        />
    </template>
    <!-- 日期时间范围选择 -->
    <template v-if="item.searchType === 'datetimeRange'">
        <el-date-picker
            v-model="params[item.prop]"
            v-bind="item.searchProps"
            type="datetimerange"
            value-format="YYYY-MM-DD HH:mm:ss"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :clearable="clearable(item)"
        />
    </template>
</template>

<script setup lang="ts">

import { PropType } from 'vue'
import { IColumns } from '@/components/proTable/type/proTablle.d.'

const props = defineProps({
    item: { type: Object as PropType<Partial<IColumns>>, default: () => ({}) },
    searchParams: { type: Object, default: () => ({}) }
})

const params = computed(() => props.searchParams)

// 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示)
const clearable = (item: Partial<IColumns>) => item.searchInitParam === undefined

</script>

<style scoped>
</style>
