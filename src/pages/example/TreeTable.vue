<template>
    <div class="app-container">
        <pro-table ref="tableRef"
                   :request="fetch"
                   :table-option="tableOption"
                   :columns="columns"
                   :pagination="pagination"
                   rowKeys="id">
            <template #operation="scope">
                <el-button type="primary" link>查看</el-button>
                <el-button type="info" link>编辑</el-button>
                <el-button type="warning" link>重置</el-button>
                <el-popconfirm title="确定要删除这一项?" @confirm="">
                    <template #reference>
                        <el-button type="danger" link>删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </pro-table>
    </div>
</template>

<script setup lang="tsx">
import ProTable from '@/components/proTable/proTable.vue'

import { IProTale, IColumns, IPagination } from '@/components/proTable/type/proTablle.d.'
import { getTreeTableDataApi } from '@/api/treeTable'
import { cloneDeep, mapping } from '@/utils/util'

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const tableRef = ref()

const pagination = reactive<Partial<IPagination>>({ show: false })

getTreeTableDataApi().then((res: any) => {
    const data = cloneDeep(res.data.list)
    const list = mapping(data)
    console.log(list)
})

const fetch = async (): Promise<any> => {
    try {
        const { data: res }: any = await getTreeTableDataApi()
        const list = mapping(cloneDeep(res.list))
        return {
            preData: res.list,
            data: list,
            current: res.current,
            total: res.total,
            success: true
        }
    } catch (error) {
        return {
            success: false,
            error
        }
    }
}

const tableOption: Partial<IProTale> = {
    border: true,
    stripe: true,
    lazy: true,
    treeProps: {
        children: 'children',
        hasChildren: 'hasChildren'
    }
}

const columns: IColumns[] = [
    {
        type: 'selection',
        minWidth: '50',
        fixed: 'left',
    },
    {
        type: 'index',
        label: '#',
        align: 'center',
        fixed: true,
        width: 80
    },
    {
        prop: 'dateTime',
        label: 'DateTime',
        minWidth: 250,
    },
    {
        prop: 'name',
        label: 'Name',
        minWidth: 120
    },
    {
        prop: 'state',
        label: 'State',
        minWidth: 120
    },
    {
        prop: 'city',
        label: 'City',
        minWidth: 120
    },
    {
        prop: 'address',
        label: 'Address',
        minWidth: 200
    },
    {
        prop: 'operation',
        label: '操作',
        minWidth: 200,
        fixed: 'right',
    }
]

</script>

<style scoped>
</style>
