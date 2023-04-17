export const { toString } = Object.prototype

function isType(val, type) {
    return toString.call(val) === `[object ${type}]`
}

/**
 * @param {all} val
 * @returns {Boolean}
 */
export function isUndefined(val) {
    return typeof val === 'undefined'
}

/**
 * @param {all} val
 * @returns {Boolean}
 */
export function isNull(val) {
    return val === null
}

/**
 * @param {all} val
 * @returns {Boolean}
 */
export function isString(val) {
    return typeof val === 'string'
}

/**
 * @param {all} val
 * @returns {Boolean}
 */
export function isNumber(val) {
    return typeof val === 'number' && !isNaN(val)
}

/**
 * @param {all} val
 * @returns {Boolean}
 */
export function isBoolean(val) {
    return typeof val === 'boolean'
}

/**
 * @param {all} val
 * @returns {Boolean}
 */
export function isFunction(val) {
    return typeof val === 'function'
}

/**
 * @param {all} val
 * @returns {Boolean}
 */
export function isPlainObject(val) {
    return isType(val, 'Object')
}

/**
 * @param {all} val
 * @returns {Boolean}
 */
export function isArr(val) {
    return isType(val, 'Array')
}

/**
 * @param {all} val
 * @returns {Boolean}
 */
export function isDateObject(val) {
    return isType(val, 'Date')
}

/**
 * @param {all} val
 * @returns {Boolean}
 */
export function isImage(val) {
    const exts = ['jpeg', 'jpg', 'png', 'gif']
    return exts.indexOf(val) > -1
}
