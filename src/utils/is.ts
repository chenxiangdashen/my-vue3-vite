/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isNull(val: any) {
  return val === null
}
export function isUndef(val: any) {
  return typeof val === "undefined"
}
export function isNullOrUndef(val: any) {
  return isNull(val) || isUndef(val)
}
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @description: 是否为对象
 */
export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, "Object")
}
