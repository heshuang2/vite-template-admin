<template>
    <div class="overflow-hidden w-full">
        <search-form :columns="searchColumns" :search-params="searchParam" :searchLoading="searchLoading"
                     :form-option="formOption" @reset="reset" @search="search"/>
        <!-- 表格头部 操作按钮 -->
        <div class="bg-white p-5 rounded overflow-hidden">
            <div class="mb-4 flex justify-between">
                <div>
                    <slot name="tableHeader" :ids="selectedListIds" :isSelected="isSelected"/>
                </div>
                <div v-if="toolButton" class="text-gray-600">
                    <el-tooltip effect="dark" placement="top" content="刷新">
                        <span class="mx-2 tool transition-colors" @click="toolReload">
                            <Icon icon="uiw:reload" height="18"/>
                        </span>
                    </el-tooltip>
                    <el-tooltip effect="dark" placement="top" content="尺寸">
                        <el-dropdown trigger="click" @command="handleCommand">
                            <span class="mx-2 tool transition-colors">
                                <Icon icon="system-uicons:expand-height" height="18"/>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item
                                        v-for="(item, index) in sizeList"
                                        :command="item[0]"
                                        :key="index"
                                        :class="{'size-active': size === item[0]}"
                                    >{{ item[1] }}
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-tooltip>
                    <el-tooltip effect="dark" placement="top" content="设置">
                        <el-dropdown trigger="click">
                            <span class="mx-2 tool transition-colors">
                                <Icon icon="uiw:setting-o" height="18"/>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>Action 1</el-dropdown-item>
                                    <el-dropdown-item>
                                        Action 2
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-tooltip>
                </div>
            </div>
            <!-- 表格主体 -->
            <el-table
                ref="tableRef"
                :data="tableData"
                v-loading="loading"
                :size="size"
                @selection-change="selectionChange"
                :row-key="getRowKeys"
                style="width: 100%"
                :height="tableOption.height"
                :max-height="tableOption.maxHeight"
                :stripe="tableOption.stripe"
                :border="tableOption.border"
                :fit="tableOption.fit"
                :show-header="tableOption.showHeader"
                :highlight-current-row="tableOption.highlightCurrentRow"
                :current-row-key="tableOption.currentRowKey"
                :row-style="tableOption.rowStyle"
                :cell-style="tableOption.cellStyle"
                :header-row-style="tableOption.headerRowStyle"
                :header-cell-style="tableOption.headerCellStyle"
                :lazy="tableOption.lazy"
                :tree-props="tableOption.treeProps"
                :load="getChildren"
            >
                <template v-for="(item, index) in columns" :key="index">
                    <!-- selection || index -->
                    <el-table-column
                        v-if="item.type === 'selection' || item.type === 'index'"
                        :type="item.type"
                        :reserve-selection="!!rowKeys"
                        :label="item.label"
                        :width="item.width"
                        :min-width="item.minWidth"
                        :fixed="item.fixed"
                        :align="item.align"
                        :header-align="item.headerAlign"
                    >
                    </el-table-column>
                    <el-table-column
                        v-else
                        :fixed="item.fixed"
                        :prop="item.prop"
                        :label="item.label"
                        :width="item.width"
                        :align="item.align"
                        :min-width="item.minWidth"
                        :header-align="item.headerAlign"
                    >
                        <template #default="scope">
                            <!-- 自定义配置每一列 slot（使用作用域插槽） -->
                            <slot :name="item.prop" :row="scope.row">
                                <!-- 图片(自带预览) -->
                                <el-image
                                    v-if="item.image"
                                    :src="scope.row[item.prop]"
                                    :preview-src-list="[scope.row[item.prop]]"
                                    fit="cover"
                                    class="table-image"
                                    preview-teleported
                                />
                                <!-- tag 标签（自带格式化内容） -->
                                <el-tag v-else-if="item.tag" :type="item.tag(scope.row)" :key="columnRenderKey">
                                    {{
                                        item.enum?.length ? filterEnum(scope.row[item.prop], item.enum) : defaultFormat(0, 0, scope.row[item.prop])
                                    }}
                                </el-tag>
                                <!-- 使用tsx语法渲染插槽 -->
                                <component v-else-if="item.columnRender" :is="item.columnRender" :key="columnRenderKey"
                                           :row="scope.row[item.prop]"/>
                                <!-- 文字（自带格式化内容） -->
                                <span v-else>
                                    {{
                                        item.enum?.length ? filterEnum(scope.row[item.prop], item.enum) : defaultFormat(0, 0, scope.row[item.prop])
                                    }}
                                </span>
                            </slot>
                        </template>
                    </el-table-column>
                    <slot name="operation"/>
                </template>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                v-if="paginationOption.show"
                class="float-right mt-4"
                v-model:currentPage="pageable.current"
                v-model:page-size="pageable.pageSize"
                :page-sizes="paginationOption.pageSizes"
                :background="paginationOption.background"
                :hide-on-single-page="paginationOption.hideOnSinglePage"
                :layout="paginationOption.layout"
                :total="pageable.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { IPagination, IProTableProps, IProTale, IColumns, IFormOption } from './type/proTablle.d.'
import { PropType } from 'vue'
import { useTable } from '@/hooks/useTable'
import { useSelection } from '@/hooks/useSelection'
import { filterEnum, defaultFormat } from '@/utils/util'
import { useThrottleFn } from '@vueuse/core'

import { Icon } from '@iconify/vue'
import SearchForm from '@/components/searchForm/SearchForm.vue'

// 表格 DOM 元素
const tableRef = ref()

const props = defineProps({
    params: { type: Object as PropType<IProTableProps['params']> },
    request: {
        type: Function as PropType<IProTableProps['request']>,
        default: () => Promise<any>
    },
    // 列定义
    columns: { type: Array as PropType<IProTableProps['columns']> },
    // 分页
    pagination: {
        type: Object as PropType<IPagination>,
        default: () => ({
            show: true,
            pageSizes: [10, 25, 50, 100],
            background: true,
            hideOnSinglePage: true,
            layout: 'total, sizes, prev, pager, next, jumper'
        })
    },
    // 表格属性
    tableOption: { type: Object as PropType<Partial<IProTale>> },
    // 是否显示表格操作功能
    toolButton: { type: Boolean, default: true },

    /*
     * 分页记录多选，不传则分页不记录多选状态，传值为行数据的 Key o
     * or
     * tree 表格唯一值
     */
    rowKeys: { type: String, default: '' },
    //  当前选中的所有ids(数组) 配置id字段
    idKey: { type: String, default: 'id' },
    // searchForm 配置项
    formOption: { type: Object as PropType<IFormOption>, default: () => ({}) },
})

// 表格分页
const paginationOption = reactive<IPagination>({
    show: true,
    pageSizes: [10, 25, 50, 100],
    background: true,
    hideOnSinglePage: true,
    layout: 'total, sizes, prev, pager, next, jumper'
})

Object.assign(paginationOption, props.pagination)


// 表格操作 Hooks
const {
    loading,
    tableData,
    pageable,
    columnRenderKey,
    searchParam,
    searchLoading,
    initSearchParam,
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
    getChildren
} =
    useTable(props.request, props.params, props.pagination.show, props.tableOption)

console.log(searchParam.value)

// 表格多选 Hooks
const {
    selectionChange,
    getRowKeys,
    selectedListIds,
    isSelected,
    selectionRemoveIds
} = useSelection(props.rowKeys, props.idKey, tableRef)

// 表格列配置项处理（添加 isShow 属性，控制显示/隐藏）
const tableColumns = ref<IColumns[]>()
tableColumns.value = (props.columns as IColumns[]).map(item => ({
    ...item,
    isShow: item.isShow ?? true
}))
// 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，获取enum数据
tableColumns.value.forEach(async item => {
    if (item.enum && typeof item.enum === 'function') {
        const { data } = await item.enum()
        item.enum = data
    }
})
// 过滤需要搜索的配置项
const searchColumns = tableColumns.value.filter(item => item.search)
// 设置搜索表单的默认值
searchColumns.forEach(column => {
    if (column.searchInitParam !== undefined && column.searchInitParam !== null) {
        initSearchParam.value[column.prop!] = column.searchInitParam
    }
})

// 刷新
const toolReload = useThrottleFn(getTableList, 2000)

// 表格尺寸
const size = ref<string>('default')
const sizeList = [['large', '大'], ['default', '默认'], ['small', '小']]
const handleCommand = (command: string) => {
    size.value = command
}

// 暴露给父组件的参数和方法
defineExpose({ searchParam, refresh: getTableList, removeIds: selectionRemoveIds })
</script>

<style lang="scss" scoped>
::v-deep(.el-loading-mask) {
    z-index: 2;
}

.tool {
    cursor: pointer;

    &:hover {
        color: $menuActiveText;
    }
}

::v-deep(.size-active) {
    background-color: $menuActiveBg;
    color: #FFFFFF;
}

</style>
