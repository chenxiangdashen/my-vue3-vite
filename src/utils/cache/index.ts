import { createWebStorage } from "./web-storage";

export const createLocalStorage = function (option: any = {}) {
  return createWebStorage({
    prefixKey: option.prefixKey || "",
    storage: localStorage,
  });
};

export const createSessionStorage = function (option: any = {}) {
  return createWebStorage({
    prefixKey: option.prefixKey || "",
    storage: sessionStorage,
  });
};
