import { isPlainObject, isArr } from './validate-type'

/**
 * @param {object} val
 * @returns {Boolean}
 */
export function isEmptyObject(val) {
    if (isPlainObject(val)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const k in val) {
            // eslint-disable-next-line no-prototype-builtins
            if (val.hasOwnProperty(k)) {
                return !1
            }
        }
    }

    return !0
}

/**
 * @param {array} val
 * @returns {Boolean}
 */
export function isEmptyArray(val) {
    return isArr(val) && val.length === 0
}

/**
 * @param {all} val
 * @returns {Boolean}
 */
export function isEmpty(val) {
    if (typeof val === 'undefined' || val === null || val === '') {
        return true
    }

    if (isEmptyArray(val)) {
        return true
    }

    if (isEmptyObject(val)) {
        return true
    }

    return false
}

/**
 * @param {all} val
 * @returns {Boolean}
 */
export function isEmptyValue(val) {
    if (typeof val === 'undefined' || val === null || val === '') {
        return true
    }

    return false
}
