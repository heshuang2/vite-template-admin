
const dataBase : any[] = []
let levelId2 = 1
let id2 = 1
let levelId3 = 1

for (let i = 1; i <= 200; i++ ) {
    const level = Math.round(Math.random() * (3 - 2)) + 1
    let id, pid
    if (i === 1) {
        id = i
        pid = 0
    } else if (level === 1) {
        id = 10 + levelId2
        levelId2++
        levelId3 = 1
        id2 = id
        pid = 1
    } else {
        id = id2 * 10 + levelId3
        levelId3++
        pid = id2
    }
    const mouth = Math.round(Math.random() * (12 - 1)) + 1
    const date = Math.round(Math.random() * (30 - 1)) + 1
    const zip = Math.round(Math.random() * (99999 - 10000)) + 10000
    const index = i

    dataBase.push({
        id,
        pid,
        dateTime: `2022-${mouth < 10 ? `0${mouth}` : mouth}-${date < 10 ? `0${date}` : date}`,
        name: `Edward${index}`,
        state: 'California',
        city: 'Los Angeles',
        address: `wuhan, Park Lane no.${index}`,
        zip,
    })
}

function generateData() {
    return {
        list: dataBase,
        total: dataBase.length
    }
}


export default [
    // 获取 treeTable 数据
    {
        url: '/api/vue-admin-template/treeTable',
        type: 'get',
        timeout: 500,
        response: () => ({
            code: 200,
            data: generateData()
        })
    }
]
