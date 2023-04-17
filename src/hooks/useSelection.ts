import { ref, computed } from 'vue'
import { map } from 'lodash'

/**
 * @description 表格多选数据操作
 *
 */
export const useSelection = (rowKeys: string, idKey: string, tableRef: any) => {
    // 是否选中数据
    const isSelected = ref<boolean>(false)
    // 选中的数据列表
    const selectedList = ref([])

    // 当前选中的所有ids(数组)，可根据项目自行配置id字段
    const selectedListIds = computed((): (string | number)[] => map(selectedList.value, idKey))

    // 获取行数据的 Key,用来优化 Table 的渲染;在使用跨页多选时,该属性是必填的
    const getRowKeys = !rowKeys ? '' : (row: any) => row[rowKeys]

    /**
     * @description 多选操作
     * @param {Array} rowArr 当前选择的所有数据
     * @return void
     */
    const selectionChange = (rowArr: any) => {
        rowArr.length === 0 ? isSelected.value = false : isSelected.value = true
        selectedList.value = rowArr
    }

    /**
     * @description 删除指定ids
     * @param {Array} ids 当前删除的ids列表
     * @return void
     */

    const selectionRemoveIds = (ids: Array<number|string> | number | string) => {
        if (!Array.isArray(ids)) {
            if (selectedListIds.value.includes(ids as string | number)) {
                return clearSelection()
            }
        } else {
            clearSelection()
        }
    }

    /**
     * @description 清除已选择的 selection
     * @return void
     */
    const clearSelection = () => {
        tableRef.value.clearSelection()
    }

    return {
        isSelected,
        selectedList,
        selectedListIds,
        selectionChange,
        getRowKeys,
        selectionRemoveIds
    }
}
