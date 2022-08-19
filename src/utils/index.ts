/**
 * @desc  函数防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(
  method: any,
  wait: number,
  immediate: boolean
): () => void {
  let timeout;
  return function (...args: any[]): void {
    let context = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    // 立即执行需要两个条件，一是immediate为true，二是timeout未被赋值或被置为null
    if (immediate) {
      /**
       * 如果定时器不存在，则立即执行，并设置一个定时器，wait毫秒后将定时器置为null
       * 这样确保立即执行后wait毫秒内不会被再次触发
       */
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) {
        method.apply(context, args);
      }
    } else {
      // 如果immediate为false，则函数wait毫秒后执行
      timeout = setTimeout(() => {
        /**
         * args是一个类数组对象，所以使用fn.apply
         * 也可写作method.call(context, ...args)
         */
        method.apply(context, args);
      }, wait);
    }
  };
}

/**
 * 解析规范响应消息
 * response:(mock: res.data, server: res): { code: 200, message: 'xxx', data: { list1: [], total } }
 *
 * @param {object} res response from mock or server
 * @return {objcet}
 */
export function parseResponse(res: any) {
  // mock data or real response data
  let detail;
  if (typeof res.data === "string") {
    try {
      detail = JSON.parse(res.data);
      if (!detail) {
        detail = res;
      }
    } catch (e) {
      detail = res;
    }
  } else {
    detail = res.data || res;
  }

  if (detail && detail.code === "500") {
    let errorText =
      detail.data.indexOf("ORA-") > -1 || detail.data.indexOf("SQL") > -1
        ? "数据库错误，请稍后重试并联系管理员"
        : detail.data;
    if (detail.data.indexOf("###") > -1) {
      errorText = "网络错误，请稍后重试！";
    }
    if (detail.data.indexOf("ticket error") > -1) {
      errorText = "登录超时，需重新登录！";
    }

    window.$message.error(errorText);
  }

  return detail;
}
