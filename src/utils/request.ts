import { stringify } from "qs";
export function filterParam(param: any) {
  const flag = typeof param === "object";
  const obj = flag ? {} : param;
  if (flag) {
    const keys = Object.keys(param);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (
        param[key] === undefined ||
        param[key] === null ||
        param[key] === ""
      ) {
        // 过滤这一部分参数
      } else {
        obj[key] = param[key];
      }
    }
  }
  return objToString(obj);
}
// 对象转换成字符串
export function objToString(obj: any) {
  const keys = Object.keys(obj);
  let str = "";
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    str += `${key}=${obj[key]}&`;
  }
  return str.slice(0, -1);
}
