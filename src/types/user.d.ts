export interface ILoginReq {
  username: string;
  password: string;
}
export interface ILoginRes {
  data: string;
}

/** 用户信息 */
export interface UserInfoType {
  avatar: string;
  username: string;
  signature: string;
}
