import * as empty from './modules/validate-empty'
import * as format from './modules/validate-format'
import * as number from './modules/validate-number'
import * as type from './modules/validate-type'
import * as password from './modules/validate-password'

export default {
    ...empty,
    ...format,
    ...number,
    ...type,
    ...password
}
