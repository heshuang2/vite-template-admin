/**
 * @param {object} val
 * @returns {Boolean}
 */
export function isPassword(val) {
    // const reg2 = /^(?![0-9]*$)(?![A-Za-z]*$)(?![`_~!@#\$\^&\*\(\)=\|\{\}':;',\[\]\.<>/\\\?~！@#￥……&\*（）——|\{\}【】‘；：”“'。，、？]*$)[\\S]{6,30}$/;
    const reg = /^(?![0-9]*$)(?![A-Za-z]*$)(?![`_~!@#$^&*()=|{}':;',\[\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]*$)[\S]{6,30}$/;
    return reg.test(val);
}
