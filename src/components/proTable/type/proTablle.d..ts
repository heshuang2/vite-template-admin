export interface EnumProps {
    label: string; // 选项框显示的文字
    value: any; // 选项框值
    disabled?: boolean; // 是否禁用此选项
    tagType?: string; // 当 tag 为 true 时，此选择会指定 tag 显示类型
    children?: EnumProps[]; // 为树形选择时，可以通过 children 属性指定子选项
}

export type TypeProp = 'index' | 'selection' | 'expand';

export type SearchType =
    | 'text'
    | 'select'
    | 'multipleSelect'
    | 'treeSelect'
    | 'multipleTreeSelect'
    | 'date'
    | 'dateRange'
    | 'timeRange'
    | 'datetimeRange';


export interface IColumns {
    // index | selection | expand（特殊类型）
    type?: TypeProp,
    index?: number | ((index: number) => void),
    // 单元格标题（非特殊类型必填）
    label?: string,
    columnKey?: string,
    // 单元格数据（非特殊类型必填）
    prop?: string,
    // 列宽
    width?: string | number,
    minWidth?: string | number,
    // 是否固定列
    fixed?: string | boolean,
    // 自定义表头
    renderHeader?: ({ column, $index }: { column:any, $index: any }) => void,
    // 是否可排序（静态排序）
    sortable?: boolean | string,
    sortMethod?: (a: any, b: any) => void,
    sortBy?: ((row: any, index: number) => void) | string | any[],
    sortOrders?: any[],
    resizable?: boolean,
    formatter?: (row: any, column: IColumns, cellValue: any, index: number) => void,
    showOverflowTooltip?: boolean,
    align?: string,
    headerAlign?: string,
    className?: string,
    labelClassName?: string,
    selectable?: (row?: any, index?: number) => void,
    reserveSelection?: boolean,
    filters?: { text?: string, value?: number }[],
    filterPlacement?: string,
    filterMultiple?: boolean,
    filterMethod?: (value?: any, row?: any, column?: IColumns) => void,
    filteredValue?: any[],
    // 自定义列
    columnRender?: (row: any) => any,
    // 是否是标签展示 row: 行数据
    tag?: (row: any ) => string | undefined,
    // 是否是图片展示
    image?: boolean;
    // 是否为搜索项
    search?: boolean;
    // 搜索项类型
    searchType?: SearchType;
    // 搜索项初始值
    initSearchParam?: string | number | boolean | any[];
    // 是否显示在表格当中
    isShow: boolean;
    // 枚举类型（渲染值的字典）
    enum?: EnumProps[] | (() => Promise<any>);
    // 搜索项初始值
    searchInitParam: string | number | boolean | any[];
    // 搜索项参数，根据 element 文档来，标签自带属性 > props 属性
    searchProps: { [key: string]: any };
}

export interface IParams {
    current: number,
    pageSize: number,
    [key: string]: any
}

// 分页
export interface IPagination {
    show: boolean,
    pageSizes: number[],
    background: boolean,
    hideOnSinglePage: boolean,
    layout: string
}

export interface IProTableProps {
    // 初始化请求参数
    params?: IParams,
    // 请求表格数据的api ==> 必传
    request: (params: any) => Promise<any>,
    // 列定义
    columns: Partial<IColumns>[],
}

export interface IProTale {
    // Table 的高度， 默认为自动高度。 如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，
    height: string | number,
    // Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
    maxHeight: string | number,
    // 是否为斑马纹
    stripe: boolean,
    // 是否有纵向边框
    border: boolean,
    // 列的宽度是否自撑开
    fit: boolean,
    // 是否显示表头
    showHeader: boolean,
    // 是否要高亮当前行
    highlightCurrentRow: boolean,
    // 当前行的 key
    currentRowKey: string | number,
    // 行的 style 的回调方法
    rowStyle: object | (({ row, rowIndex }: { row: any, rowIndex: number }) => void),
    // 单元格的 style 的回调方法
    cellStyle: object | (({ row, column, rowIndex, columnIndex }: { row: any, column: any, rowIndex: number, columnIndex: number }) => void),
    // 表头行的 style 的回调方法
    headerRowStyle: object | (({ row, rowIndex }: { row: any, rowIndex: number }) => void),
    // 表头单元格的 style 的回调方法
    headerCellStyle: object | (({ row, column, rowIndex, columnIndex }: { row: any, column: any, rowIndex: number, columnIndex: number }) => void),
    // 是否懒加载子节点数据
    lazy: boolean,
    treeProps: { children: string, hasChildren: string }
}

// searchForm 配置项 formOption
export interface IFormOption {
    // 行内表单模式
    inline: boolean,
    // 标签的长度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto。
    labelWidth: string | number,
    // 表单域标签的位置， 当设置为 left 或 right 时，则也需要设置 label-width 属性
    labelPosition: 'left' | 'right' | 'top',
    // 表单域标签的后缀
    labelSuffix: string,
    // 用于控制该表单内组件的尺寸
    size: 'large' | 'default' | 'small',
    // 是否禁用该表单内的所有组件。 如果设置为 true, 它将覆盖内部组件的 disabled 属性
    disabled: boolean,
}
