import { reactive, computed, onMounted, toRefs } from 'vue'
import { IProTale } from '@/components/proTable/type/proTablle.d.'
import { cloneDeep, map } from 'lodash'
import { findNode } from '@/utils/util'

interface Pageable {
    current: number;
    pageSize?: number;
    total: number;
}

interface TableStateProps {
    loading: boolean,
    tableData: any[];
    preData: any[];
    tableTreeRefreshTool: {
        [key: string]: any;
    };
    columnRenderKey: number,
    searchShow: boolean;
    pageable: Pageable;
    searchParam: {
        [key: string]: any;
    };
    initSearchParam: {
        [key: string]: any;
    };
    totalParam: {
        [key: string]: any;
    };
    icon?: {
        [key: string]: any;
    };
    searchLoading: boolean;
}


/**
 * @description table 页面操作方法封装
 * @param {Function} api 获取表格数据 api 方法(必传)
 * @param {Object} initParam 获取数据初始化参数(不必传，默认为{})
 * @param {Boolean} isPageable 是否有分页(不必传，默认为true)
 * @param {Object} option 数据(不必传，默认为true)
 */
export const useTable = (
    api: (params: any) => Promise<any>,
    initParam: object | undefined,
    isPageable = true,
    option: Partial<IProTale> | undefined,
) => {
    const state = reactive<TableStateProps>({
        loading: true,
        // 表格数据
        tableData: [],
        // 如果表格为树形结构数据,初始数据为一维数据，
        preData: [],
        // tree 表格存储children
        tableTreeRefreshTool: {},
        // 自定义列 页数改变重新渲染
        columnRenderKey: 0,
        // 是否展开更多搜索框
        searchShow: false,
        // 分页数据
        pageable: {
            // 当前页数
            current: 1,
            // 每页显示条数
            pageSize: 10,
            // 总条数
            total: 0
        },
        // 查询参数(只包括查询)
        searchParam: {},
        // 初始化默认的查询参数
        initSearchParam: {},
        // 总参数(包含分页和查询参数)
        totalParam: {},
        searchLoading: false
    })

    /**
     * @description 分页查询参数(只包括分页和表格字段排序,其他排序方式可自行配置)
     *
     */
    const pageParam = computed({
        get: () => ({
            current: state.pageable.current,
            pageSize: state.pageable.pageSize
        }),
        set: (newVal: any) => {
            console.log('我是分页更新之后的值', newVal)
        }
    })

    // 初始化的时候需要做的事情就是 设置表单查询默认值 && 获取表格数据(reset函数的作用刚好是这两个功能)
    onMounted(() => {
        reset()
    })

    /**
     * @description 获取表格数据
     * @return void
     *
     */
    const getTableList = async () => {
        try {
            // 先更新查询参数
            updatedTotalParam()
            state.searchLoading = true
            state.loading = true
            console.log(state.totalParam)
            const res = await api(state.totalParam)
            state.searchLoading = false
            state.loading = false
            state.tableData = []
            Object.assign(state.tableData, res.data )
            // 如果是懒加载处理 tree
            if (option?.lazy) {
                state.preData = cloneDeep(state.tableData)
                // 处理 tableData children 和 hasChildren
                map(state.tableData, v => {
                    if (v.children) {
                        const options = option?.treeProps as IProTale['treeProps']
                        v[options.children] = true
                        v[options.hasChildren] = true
                    }
                    return v
                })
            }
            // 解构后台返回的分页数据(如果有分页更新分页信息)
            const { current, total } = res
            state.columnRenderKey = current
            isPageable && updatePageable({ current, total })
        } catch (error) {
            state.searchLoading = false
            state.loading = false
            console.error(error)
            return error
        }
    }

    /**
     * @description 更新查询参数
     * @return void
     *
     */
    const updatedTotalParam = () => {

        /*
         * state.totalParam = {}
         * 处理查询参数，可以给查询参数加自定义前缀操作
         */
        const nowSearchParam: { [propName: string]: any } = {}
        // 防止手动清空输入框携带参数（可以自定义查询参数前缀）
        for (const key in state.searchParam) {
            // * 某些情况下参数为 false/0 也应该携带参数
            if (state.searchParam[key] || state.searchParam[key] === false || state.searchParam[key] === 0 || state.searchParam[key] === '') {
                nowSearchParam[key] = state.searchParam[key]
            }
        }
        Object.assign(state.totalParam, nowSearchParam, isPageable ? pageParam.value : {})
    }

    /**
     * @description 更新分页信息
     * @param {Object} resPageable 后台返回的分页数据
     * @return void
     *
     */
    const updatePageable = (resPageable: Pageable) => {
        Object.assign(state.pageable, resPageable)
        state.pageable.pageSize = pageParam.value.pageSize
    }

    /**
     * @description 表格数据查询
     * @return void
     *
     */
    const search = async () => {
        state.pageable.current = 1
        await getTableList()
    }

    /**
     * @description 表格数据重置
     * @return void
     *
     */
    const reset = async () => {
        state.pageable.current = 1
        state.searchParam = {}
        state.totalParam = {}
        // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
        Object.keys(state.initSearchParam).forEach(key => {
            state.searchParam[key] = state.initSearchParam[key]
        })
        Object.assign(state.totalParam, initParam)
        Object.assign(pageParam.value, state.totalParam)
        await getTableList()
    }

    /**
     * @description 每页条数改变
     * @param {Number} val 当前条数
     * @return void
     *
     */
    const handleSizeChange = () => getTableList()

    /**
     * @description 当前页改变
     * @param {Number} val 当前页
     * @return void
     */
    const handleCurrentChange = () => getTableList()

    /**
     * @description tree 结构 lazy reload
     * @param {any} row 当前数据
     * @param {unknown} treeNode
     * @param {(data: any) => void} resolve
     * @return void
     */

    const getChildren = (row: any, treeNode: unknown, resolve: (data: any) => void ) => {
        console.log(row)
        // 在之前声明的全局变量中，增加一个key为 本条数据的id，id可替换为你数据中的任意唯一值
        state.tableTreeRefreshTool[row.insCode] = {}
        // 重要！保存resolve方法，以便后续使用
        state.tableTreeRefreshTool[row.insCode].resolve = resolve
        // 记录展开次数
        state.tableTreeRefreshTool[row.insCode].expandCount = 0
        let data: any[] = []
        // 查找展开节点的 children 数据
        data = cloneDeep(findNode(state.preData, node => node.id === row.id).children)
        data.forEach(item => {
            if (item.children.length !== 0) {
                item.children = true
                item.hasChildren = true
            }
        })
        console.log(data)
        setTimeout(() => {
            resolve(data)
        }, 100)
    }

    return {
        ...toRefs(state),
        getTableList,
        search,
        reset,
        handleSizeChange,
        handleCurrentChange,
        getChildren
    }
}
