import { requestConfig } from '@/request'

// 获取列表数据
export function getTableDataApi(data: any) {
    return requestConfig({
        url: '/vue-admin-template/table',
        method: 'post',
        data
    })
}

// 删除列表数据
export function getDeleteTableDataApi(data: number[]) {
    return requestConfig({
        url: '/vue-admin-template/table/delete',
        method: 'post',
        data
    })
}
