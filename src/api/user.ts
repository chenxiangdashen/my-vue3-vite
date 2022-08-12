import request from "../service/index";
import { useRequest } from "../hooks/index";
import { ILoginReq, ILoginRes } from "../types/user.d";

const login = (data: ILoginReq) => {
  return request<ILoginReq, ILoginRes>({
    url: "/auth/login",
    method: "post",
    data,
  });
};

export const useLogin = (data: ILoginReq) => {
  return useRequest<ILoginReq>(login, data);
};
