export function validateEmail(value: string): boolean | Error {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (!reg.test(value)) {
    return Error("请输入正确的邮箱格式")
  }
  return true
}
export function validatePhoneNumber(value: string): boolean | Error {
  const reg = /^1[3456789]d{9}$/
  if (!reg.test(value)) return Error("请输入正确的手机号码")
  return true
}
