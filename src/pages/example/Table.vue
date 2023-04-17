<template>
    <div class="app-container">
        <pro-table
            ref="tableRef"
            :params="params"
            :request="fetch"
            :table-option="tableOption"
            :columns="columns"
            rowKeys="name"
            :form-option="formOption"
        >
            <template #tableHeader="scope">
                <el-button type="primary" :icon="Plus">新建</el-button>
                <el-popconfirm title="确定要删除这几项?" @confirm="batchDelete(scope.ids)">
                    <template #reference>
                        <el-button type="danger" :icon="Delete" :disabled="scope.ids.length === 0">批量删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
            <template #status="scope">
                <el-switch
                    v-model="scope.row.status"
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                    inline-prompt
                    :active-value="1"
                    :inactive-value="0"
                />
                <span class="px-2 text-sm transition-colors"
                      :style="{color: scope.row.status ? '#13ce66' : '#ff4949'}">
                    {{ scope.row.status ? '开启' : '关闭' }}
                </span>
            </template>
            <template #operation="scope">
                <el-button type="primary" link>查看</el-button>
                <el-button type="primary" link  @click="handleEdit(scope.ids)">编辑</el-button>
                <el-popconfirm title="确定要删除这一项?" @confirm="handleDelete(scope.row.id)">
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
import { getTableDataApi, getDeleteTableDataApi } from '@/api/table'
import { IProTale, IColumns, IParams, IFormOption } from '@/components/proTable/type/proTablle.d.'
import { Plus, Delete } from '@element-plus/icons-vue'

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const tableRef = ref()

const params = reactive<IParams>({
    current: 1,
    pageSize: 10
})

const fetch = async (params: IParams): Promise<any> => {
    try {
        const { data: res }: any = await getTableDataApi(params)
        return {
            data: res.list || res.data,
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
    stripe: true
}

const formOption: Partial<IFormOption> = { labelWidth: 80 }

// tsx渲染列
const columnRender = (scope: any) => <el-tag
    type={new Map([['home', 'success'], ['Office', 'danger'], ['bar', 'info']]).get(scope.row)}
    onClick={() => {
        ElMessage.success('我是自定义列')
    }}>
    {scope.row}
</el-tag>


const columns: Partial<IColumns>[] = [
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
        minWidth: 50
    },
    {
        prop: 'name',
        label: '姓名',
        minWidth: 120,
        search: true,
    },
    {
        prop: 'dateTime',
        label: '创建日期',
        minWidth: 150,
        search: true,
        searchType: 'datetimeRange',
        searchProps: { disabledDate: (time: Date) => time.getTime() < Date.now() - 8.64e7 },
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
        minWidth: 200,
        search: true,
    },
    {
        prop: 'zip',
        label: 'Zip',
        minWidth: 120,
        tag: (row: any) => new Map([
            ['home', ''], ['Office', 'success'], ['bar', 'danger']
        ]).get(row.tag)
    },
    {
        prop: 'status',
        label: 'Status',
        minWidth: 150,
    },
    {
        prop: 'tag',
        label: '标签',
        minWidth: 120,
        columnRender,
        search: true,
        searchType: 'select',
        enum: [
            { label: 'home', value: 'home' },
            { label: 'bar', value: 'bar' },
            { label: 'office', value: 'office' },
        ]
    },
    {
        prop: 'operation',
        label: '操作',
        minWidth: 160,
        fixed: 'right',
    }
]

// 删除
const handleDelete = async (id: number) => {
    const ids = []
    ids.push(id)
    try {
        await getDeleteTableDataApi(ids)
        ElMessage.success('删除成功')
        tableRef.value.refresh()
        tableRef.value.removeIds(id)
    } catch (err) {
        return err
    }
}

// 批量删除
const batchDelete = async (ids: Array<any>) => {
    try {
        await getDeleteTableDataApi(ids)
        ElMessage.success('删除成功')
        tableRef.value.refresh()
        tableRef.value.removeIds(ids)
    } catch (err) {
        return err
    }
}

const handleEdit = (ids: Array<any>) => {
    console.log(ids)
}

</script>

<style scoped>
</style>
