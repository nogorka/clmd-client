import { ElMessage } from 'element-plus'

const types = ['error', 'info', 'success', 'warning']

/**
 * @type {Object.<string, Function>}
 * @property {Function} error
 * @property {Function} info
 * @property {Function} success
 * @property {Function} warning
 */
export const UiMessage = (() => {
  return types.reduce((accumulator, type) => {
    return {
      ...accumulator,
      [type](message) {
        ElMessage({ type, message, plain: true })
      }
    }
  }, {})
})()
