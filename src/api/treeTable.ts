import { requestConfig } from '@/request'

// 获取列表数据
export function getTreeTableDataApi(params?: any) {
    return requestConfig({
        url: '/vue-admin-template/treeTable',
        method: 'get',
        params
    })
}
