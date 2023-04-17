/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isInteger(val) {
    const reg = /^-?\d+$/
    return reg.test(val)
}

/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isPositiveInteger(val) {
    const reg = /^\+?[1-9]\d*$/
    return reg.test(val)
}

/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isNegtiveInteger(val) {
    const reg = /^-[1-9]\d*$/
    return reg.test(val)
}

/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isNonPositiveInteger(val) {
    const reg = /^-[1-9]\d*|0$/
    return reg.test(val)
}

/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isNonnegtiveInteger(val) {
    const reg = /^[1-9]\d*|0$/
    return reg.test(val)
}

/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isFloat(val) {
    const reg = /^[+-]?\d+\.\d+$/
    return reg.test(val)
}

/**
 * @param {string} val
 * @param {number} decimal
 * @returns {Boolean}
 */
export function isFloatWithDecimal(val, decimal) {
    const de = decimal || 1
    const reg = new RegExp(`^(-?\\d+)(\\.\\d{1,${de}})?$`)
    return reg.test(val)
}

/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isPositiveFloat(val) {
    const reg = /^[1-9]\d*.\d*|0.\d*[1-9]\d*$/
    return reg.test(val)
}

/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isNegtiveFloat(val) {
    const reg = /^-([1-9]\d*.\d*|0.\d*[1-9]\d*)$/
    return reg.test(val)
}

/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isNonPositiveFloat(val) {
    const reg = /^(-([1-9]\d*.\d*|0.\d*[1-9]\d*))|0?.0+|0$/
    return reg.test(val)
}

/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isNonnegtiveFloat(val) {
    const reg = /^[1-9]\d*.\d*|0.\d*[1-9]\d*|0?.0+|0$/
    return reg.test(val)
}
