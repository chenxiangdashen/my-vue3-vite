import Request from "./request";
import { AxiosResponse } from "axios";

import type { RequestConfig } from "./request/types";

export interface CXResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 重写返回类型
interface CXRequestConfig<T, R> extends RequestConfig<CXResponse<R>> {
  data?: T;
}

const request = new Request({
  baseURL: import.meta.env.BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  interceptors: {
    requestInterceptors: (config: CXRequestConfig<any, any>) => {
      return config;
    },
    responseInterceptors: (res: AxiosResponse) => {
      return res;
    },
  },
});

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {CXRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const CXRequest = <D = any, T = any>(config: CXRequestConfig<D, T>) => {
  const { method = "get" } = config;
  if (method === "get" || method === "GET") {
    config.params = config.data;
  }
  return request.request<CXResponse<T>>(config);
};

// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url);
};
// 取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest();
};

export default CXRequest;
