/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @return string
 */
export function localGet(key: string) {
    const value = window.localStorage.getItem(key)
    try {
        return JSON.parse(window.localStorage.getItem(key) as string)
    } catch (error) {
        return value
    }
}

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {Any} value Storage值
 * @return void
 */
export function localSet(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @return void
 */
export function localRemove(key: string) {
    window.localStorage.removeItem(key)
}

/**
 * @description 清除所有localStorage
 * @return void
 */
export function localClear() {
    window.localStorage.clear()
}

/**
 * @description 对象数组深克隆
 * @param {target} target 源对象
 * @param {map} map 存储数据
 * @return object
 */
export function cloneDeep(target: any, map = new WeakMap()) {
    if (target === null) { return target }
    if (typeof target !== 'object') { return target }
    const cloneTarget = Array.isArray(target) ? [] : {}
    if (map.get(target)) { return map.get(target) }
    map.set(target, cloneTarget)
    // eslint-disable-next-line no-restricted-syntax
    for (const prop in target) {
        if (Object.hasOwn(target, prop)) {
            // @ts-ignore
            cloneTarget[prop] = cloneDeep(target[prop], map)
        }
    }
    return cloneTarget
}

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
export function isType(val: any) {
    if (val === null) return 'null'
    if (typeof val !== 'object') return typeof val
    return Object.prototype.toString.call(val).slice(8, -1)
        .toLocaleLowerCase()
}

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return number
 */
export function randomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (min - max) + max)
}

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export function getBrowserLang() {
    // @ts-ignore
    const browserLang = navigator.language ? navigator.language : navigator.browserLanguage
    let defaultBrowserLang = ''
    if (browserLang.toLowerCase() === 'cn' || browserLang.toLowerCase() === 'zh' || browserLang.toLowerCase() === 'zh-cn') {
        defaultBrowserLang = 'zh'
    } else {
        defaultBrowserLang = 'en'
    }
    return defaultBrowserLang
}

/**
 * @description 递归查询当前路由所对应的路由
 * @param {Array} menuList 菜单列表
 * @param {String} path 当前地址
 * @return array
 */
export function getTabPane<T, U>(menuList: any[], path: U): T {
    let result: any
    for (const item of menuList || []) {
        if (item.path === path) result = item
        const res = getTabPane(item.children, path)
        if (res) result = res
    }
    return result
}

/**
 * @description 使用递归处理路由菜单，生成一维数组
 * @param {Array} routerList 所有菜单列表
 * @param {Array} newArr 菜单的一维数组
 * @return array
 */
export function handleRouter(routerList: any[], newArr: string[] = []) {
    routerList.forEach(item => {
        typeof item === 'object' && item.path && newArr.push(item.path)
        item.children && item.children.length && handleRouter(item.children, newArr)
    })
    return newArr
}

/**
 * @description 扁平化数组对象
 * @param {Array} arr 数组对象
 * @return array
 */
export function getFlatArr(arr: any) {
    return arr.reduce((pre: any, current: any) => {
        let flatArr = [...pre, current]
        if (current.children) flatArr = [...flatArr, ...getFlatArr(current.children)]
        return flatArr
    }, [])
}

/**
 * @description 格式化表格单元格默认值
 * @param {Number} row 行
 * @param {Number} col 列
 * @param {String} callValue 当前单元格值
 * @return string
 *
 */
export function defaultFormat(row: number, col: number, callValue: any) {
    // 如果当前值为数组,使用 / 拼接（根据需求自定义）
    if (Array.isArray(callValue)) return callValue.length ? callValue.join(' / ') : '--'
    return callValue ?? '--'
}

/**
 * @description 根据枚举列表查询当需要的数据
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 枚举列表
 * @param {String} type 过滤类型（目前只有 tag）
 * @return string
 *
 */
export function filterEnum(callValue: any, enumData: any[] = [], type?: string): string {
    const filterData = enumData.find(item => item.value === callValue)
    console.log(filterData)
    if (type === 'tag') return filterData?.tagType ? filterData.tagType : ''
    return filterData ? filterData.label : '--'
}

/**
 * @description 哈希表实现 扁平化数据结构转树形结构
 * @param {items} items 源数据
 * @param {startId} startId 根节点 pid, 不传默认为 0
 * @param {myselfCode} myselfCode id唯一值的键名, 默认为 id
 * @return string
 *
 */

// 原始数据单元，类似数据库数据表的行。
type TItem = { pid?: number, id: number, [key: string]: any }
// 目标数据结构，通过children产生层级关系。
type TItemMap = TItem & { children: TItemMap[] }

export const mapping = (items: TItem[], startId = 0, id = 'id', pid = 'pid' ): TItemMap[] => {
    if (items.length < 1) {
        return []
    } else if (items.length === 1) {
        return [{ ...items[0], children: [] }]
    }
    const mapper = {} as { [key: string]: TItemMap | { children: TItemMap[] } }
    const tmp: any = []
    items.forEach(item => {
        const m: any = { ...item, children: [] }
        if (m[id] in mapper) {
            // 占位合并
            mapper[m[id]] = { ...item, children: [...mapper[m[id]].children] }
        } else {
            mapper[m[id]] = m
        }
        if (!(m[pid] in mapper)) {
            // 父节点占位
            mapper[m[pid]] = { children: [] }
        }
        mapper[m[pid]].children.push(m)
        if (m[pid] === startId) {
            tmp.push(m[id])
        }
    })
    return tmp.map((id: any) => mapper[id]) as TItemMap[]
}

/**
 * @description: 递归查找节点
 * @param {object} tree 根节点 pid, 不传默认为 0
 * @param {function} func 根节点 pid, 不传默认为 0
 */

export const findNode = (tree: any, func: (node: any) => any): any => {
    // eslint-disable-next-line no-restricted-syntax
    for (const node of tree) {
        if (func(node)) { return node }
        if (node.children) {
            const res = findNode(node.children, func)
            if (res) { return res }
        }
    }
    return null
}
