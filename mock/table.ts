import {cloneDeep, filter, remove} from 'lodash'

// 原始 data
const database: any[] = []
// 处理后的 data
let throwDatabase: any[] = []
let total = 0

for (let i = 1; i <= 1000; i++) {
    const id = i
    const mouth = Math.round(Math.random() * (12 - 1)) + 1
    const date = Math.round(Math.random() * (30 - 1)) + 1
    const zip = Math.round(Math.random() * (99999 - 10000)) + 10000
    const index = i
    const tagList = ['home', 'office', 'bar']
    const tag = tagList[Math.round(Math.random() * 2)]
    const status = Math.round(Math.random())
    database.push({
        id,
        dateTime: `2022-${mouth < 10 ? `0${mouth}` : mouth}-${date < 10 ? `0${date}` : date}`,
        name: `Edward${index}`,
        state: 'California',
        city: 'Los Angeles',
        address: `wuhan, Park Lane no.${index}`,
        zip,
        tag,
        status
    })
}

throwDatabase = cloneDeep(database)

function generateData(current: number, pageSize: number, total: number, data: any[]) {
    const list = data.slice((current - 1) * pageSize, current * pageSize)
    return {
        list,
        current,
        total
    }
}

export default [
    // 获取 table 列表
    {
        url: '/api/vue-admin-template/table',
        type: 'post',
        timeout: 500,
        response: (config: any) => {
            // eslint-disable-next-line prefer-const
            const { name, dateTime, tag, current, pageSize } = config.body
            if (!current || !pageSize) {
                return {
                    code: 503,
                    message: 'params error!'
                }
            }
            throwDatabase = filter(database, (n: any) => (!name || n.name.includes(name)) &&
                ( !dateTime || n.dateTime === dateTime ) &&
                ( !tag || n.tag === tag ))
            const total = throwDatabase.length
            const data = generateData(Number(current), pageSize, total, throwDatabase)
            return {
                code: 200,
                data
            }
        }
    },
    // 删除
    {
        url: '/api/vue-admin-template/table/delete',
        type: 'post',
        timeout: 500,
        response: (config: any) => {
            const ids = config.body
            const item = remove(database, (n: any) => ids.includes(n.id))
            if (item) {
                return {
                    code: 200,
                    data: '删除成功'
                }
            }
            return {
                code: 500,
                message: '系统错误'
            }
        }
    },
]
