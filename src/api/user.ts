import request from "../service/index";
import { filterParam } from "../utils/request";
import { useRequest } from "../hooks/index";
import { ILoginReq, ILoginRes } from "../types/user.d";

export const login = (data: ILoginReq) => {
  return request<ILoginReq>({
    url: `/auth/login?${filterParam(data)}`,
    method: "post",
    data,
  });
};

export const useLogin = (data: ILoginReq) => {
  return useRequest<ILoginReq>(login, data);
};

export const getUserInfo = () => {
  return request({
    url: `/auth/user`,
  });
};

export const useGetUserInfo = () => {
  return useRequest(getUserInfo, {});
};
