/* 省,直辖市代码表 */
const provinceAndCitys = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
}

/* 每位加权因子 */
const powers = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2']

/* 第18位校检码 */
const parityBit = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

function checkAddressCode(addressCode) {
    const check = /^[1-9]\d{5}$/.test(addressCode)
    if (!check) { return false }
    return !!provinceAndCitys[parseInt(addressCode.substring(0, 2))]
}

function checkBirthDayCode(birDayCode) {
    const check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode)
    if (!check) { return false }
    const yyyy = parseInt(birDayCode.substring(0, 4), 10)
    const mm = parseInt(birDayCode.substring(4, 6), 10)
    const dd = parseInt(birDayCode.substring(6), 10)
    const xdata = new Date(yyyy, mm - 1, dd)
    if (xdata > new Date()) {
        return false// 生日不能大于当前日期
    } return xdata.getFullYear() === yyyy && xdata.getMonth() === mm - 1 && xdata.getDate() === dd
}

function getParityBit(idCardNo) {
    const id17 = idCardNo.substring(0, 17)

    /* 加权 */
    let power = 0
    for (let i = 0; i < 17; i++) {
        power += parseInt(id17.charAt(i), 10) * parseInt(powers[i])
    }

    /* 取模 */
    const mod = power % 11
    return parityBit[mod]
}

function checkParityBit(idCardNo) {
    const cParityBit = idCardNo.charAt(17).toUpperCase()
    if (getParityBit(idCardNo) === cParityBit) {
        return true
    }
    return false

}

// 校验15位的身份证号码
function check15IdCardNo(idCardNo) {
    // 15位身份证号码的基本校验
    let check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo)
    if (!check) { return false }
    // 校验地址码
    const addressCode = idCardNo.substring(0, 6)
    check = checkAddressCode(addressCode)
    if (!check) { return false }
    const birDayCode = `19${idCardNo.substring(6, 12)}`
    // 校验日期码
    check = checkBirthDayCode(birDayCode)
    if (!check) { return false }
    // 验证校检码
    return checkParityBit(idCardNo)
}

function check18IdCardNo(idCardNo) {
    // 18位身份证号码的基本格式校验
    let check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo)
    if (!check) { return false }
    // 校验地址码
    const addressCode = idCardNo.substring(0, 6)
    check = checkAddressCode(addressCode)
    if (!check) { return false }
    // 校验日期码
    const birDayCode = idCardNo.substring(6, 14)
    check = checkBirthDayCode(birDayCode)
    if (!check) { return false }
    // 验证校检码
    return checkParityBit(idCardNo)
}

export function isIDCardNo2(idCardNo) {
    // 15位和18位身份证号码的基本校验
    const check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo)
    if (!check) { return false }
    // 判断长度为15位或18位
    if (idCardNo.length === 15) {
        return check15IdCardNo(idCardNo)
    } else if (idCardNo.length === 18) {
        return check18IdCardNo(idCardNo)
    }
    return false

}

/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isIDCardNo(_val) {
    let val = _val
    // 增加15位校验
    const card15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/

    if (card15.test(val)) {
        return true
    }

    let iSum = 0

    // 长度判断
    if (!/^\d{17}(\d|x)$/i.test(val)) {
        return false
    }

    val = val.replace(/x$/i, 'a')

    // 地区判断
    if (provinceAndCitys[parseInt(val.substr(0, 2))] == null) {
        return false
    }

    // 出生时间判断
    const birthDateStr = `${val.substr(6, 4)}/${Number(val.substr(10, 2))}/${Number(val.substr(12, 2))}`
    const birthDate = new Date(birthDateStr)
    if (birthDateStr !== `${birthDate.getFullYear()}/${birthDate.getMonth() + 1}/${birthDate.getDate()}`) {
        return false
    }

    // eslint-disable-next-line no-restricted-properties
    for (let i = 17; i >= 0; i--) { iSum += Math.pow(2, i) % 11 * parseInt(val.charAt(17 - i), 11) }
    if (iSum % 11 !== 1) {
        return false
    }
    return true
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isURL(val) {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return reg.test(val)
}

/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isEmail(val) {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(val)
}

/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isIP(val) {
    const reg = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/
    return reg.test(val)
}

/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isMobile(val) {
    const reg = /^1[^012]\d{9}$/
    return reg.test(val)
}

/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isTelephone(val) {
    const reg = /^(([0+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/
    return reg.test(val)
}

/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isPhone(val) {
    // const reg2 = /^(?![0-9]*$)(?![A-Za-z]*$)(?![`_~!@#\$\^&\*\(\)=\|\{\}':;',\[\]\.<>/\\\?~！@#￥……&\*（）——|\{\}【】‘；：”“'。，、？]*$)[\\S]{6,30}$/;
    const reg = /^1[3456789]\d{9}$/
    return reg.test(val)
}

/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isAlphabets(val) {
    const reg = /^[A-Za-z]+$/
    return reg.test(val)
}

/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isUpperCase(val) {
    const reg = /^[A-Z]+$/
    return reg.test(val)
}

/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isLowerCase(val) {
    const reg = /^[a-z]+$/
    return reg.test(val)
}

/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isDate(val) {
    const reg = /^\d{4}(-|\/|.)\d{1,2}\1\d{1,2}$/
    return reg.test(val)
}

/**
 * @param {string} val
 * @returns {Boolean}
 */
export function isPostCode(val) {
    const reg = /^[1-9][0-9]{5}$/
    return reg.test(val)
}
