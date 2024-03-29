import { ref, computed } from "vue";
import { delay, debounce, throttle } from "lodash";

import type { CXResponse } from "../../../service/index";
import type { IUseRequestOptions, IUseRequestRequest } from "../types/index";

const defaultOptions: IUseRequestOptions = {
  debounce: false,
  debounceInterval: 500,
  throttle: false,
  throttleInterval: 500,
  polling: false,
  pollingInterval: 500,
  autoRun: true,
  onFinish: () => {},
};

const useRequest = <
  ParamType = any,
  PromiseRequestType = any,
  DataType = CXResponse<PromiseRequestType>
>(
  PromiseRequest: (p: ParamType) => Promise<DataType>,
  params: ParamType,
  opt?: IUseRequestOptions<DataType>
): IUseRequestRequest<ParamType, DataType> => {
  type Params = ParamType;
  // 合并配置项
  const option = Object.assign({}, defaultOptions, opt);
  const loading = ref(false);
  const data = ref<DataType>();
  // 警告
  if (option.throttle && option.debounce) {
    console.warn(
      "[ywz warn]: useRequest的配置项中的throttle和debounce均为true，请选择一个，否则这样默认使用防抖"
    );
  }

  // 调用方法
  const run = async (): Promise<void> => {
    loading.value = true;
    // 调用请求方法
    // 调用防抖、节流或者普通函数
    data.value = await PromiseRequest(params);

    loading.value = false;
    option.onFinish && option.onFinish(data.value);
  };
  const runParams = async (_params: ParamType): Promise<void> => {
    loading.value = true;
    // 调用请求方法
    // 调用防抖、节流或者普通函数
    data.value = await PromiseRequest(_params);

    loading.value = false;
    option.onFinish && option.onFinish(data.value);
  };
  // 轮询
  const polling = async () => {
    loading.value = true;
    data.value = await PromiseRequest(params);
    loading.value = false;
    option.onFinish && option.onFinish(data.value);
    delay(polling, option.pollingInterval as number);
  };
  // 自动调用
  option.autoRun && run();
  // 是否轮iii询
  option.polling && polling();
  // 计算最终使用的函数
  const runComputed = computed(() => {
    // 判断是否开启防抖
    if (option.debounce)
      return {
        run: debounce(run, option.throttleInterval) as () => Promise<void>,
        runParams: debounce(runParams, option.throttleInterval) as (
          p: Params
        ) => Promise<void>,
      };
    // 判断是否开启节流
    if (option.throttle)
      return {
        run: throttle(run, option.throttleInterval) as () => Promise<void>,
        runParams: throttle(runParams, option.throttleInterval) as (
          p: Params
        ) => Promise<void>,
      };
    return { run, runParams };
  });
  return {
    run: runComputed.value.run,
    loading,
    data,
    runParams: runComputed.value.runParams,
  };
};

export default useRequest;
