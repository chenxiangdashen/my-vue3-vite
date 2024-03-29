import request from "../service/index"
import { filterParam } from "../utils/request"
import { useRequest } from "../hooks/index"
import { ILoginReq, ILoginRes } from "../types/user.d"
import { IReqUserInfo } from "./types/user"

export const login = (data: ILoginReq) => {
  return request<ILoginReq>({
    url: `/auth/login?${filterParam(data)}`,
    method: "post",
    data,
  })
}

export const useLogin = (data: ILoginReq) => {
  return useRequest<ILoginReq>(login, data)
}

export const getUserInfo = () => {
  return request({
    url: `/auth/user`,
  })
}

export const useGetUserInfo = () => {
  return useRequest(getUserInfo, {})
}

export const addUserInfo = (data: IReqUserInfo) => {
  return request({
    url: "/auth/user/addInfo",
    method: "post",
    data,
  })
}

export const getRolesInfo = (data: any) => {
  return request({
    url: "/auth/user/roles",
    data,
  })
}

export const updateUserRoles = (data: any) => {
  return request({
    url: "/auth/user/roles",
    method: "put",
    data,
  })
}
