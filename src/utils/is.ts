export function isNull(val: any) {
  return val === null;
}
export function isUndef(val: any) {
  return typeof val === "undefined";
}
export function isNullOrUndef(val: any) {
  return isNull(val) || isUndef(val);
}
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
