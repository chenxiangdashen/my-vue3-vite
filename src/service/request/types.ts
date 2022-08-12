import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface RequestInterceptors<T> {
  // 请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any;

  // 响应拦截
  responseInterceptors?: (config: T) => T;
  responseInterceptorsCatch?: (err: any) => any;
}

// 自定义的请求配置
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  // 请求拦截器
  interceptors?: RequestInterceptors<T>;
}

export interface CancelRequestSource {
  [index: string]: () => void;
}
