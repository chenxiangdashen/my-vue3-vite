import { defineStore } from "pinia"
import { IReqUserInfo } from "../../api/types/user"
import {
  addUserInfo,
  getRolesInfo,
  getUserInfo,
  updateUserRoles,
} from "../../api/user"
import { ResponsePermission } from "../types/types"

export const useUserStore = defineStore("user", {
  state() {
    return {
      userInfo: {},
    }
  },
  getters: {
    userId() {
      return this.userInfo?.id
    },
    name() {
      return this.userInfo?.name
    },
    avatar() {
      return this.userInfo?.avatar
    },
    role() {
      return this.userInfo?.role || []
    },
    PERMISSION(): ResponsePermission[] {
      return this.userInfo?.PERMISSION || []
    },
  },
  actions: {
    async getUserInfo() {
      try {
        const res = await getUserInfo()
        if (res.code === 200) {
          const { USER_ID, FULL_NAME, PRODUCT_TYPE, PERMISSION } = res.data
          this.userInfo = {
            id: USER_ID,
            name: FULL_NAME,
            avatar: PRODUCT_TYPE,
            role: ["admin"],
            PERMISSION: PERMISSION as ResponsePermission[],
          }
          return Promise.resolve(res)
        } else {
          return Promise.resolve(res)
        }
      } catch (error) {
        console.error(error)
        return Promise.reject(error.message)
      }
    },
    logout() {
      this.userInfo = {}
    },
    setUserInfo(userInfo = {}) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
    async addUserInfo(data: IReqUserInfo) {
      const res = await addUserInfo(data)
      if (res.code === 200) {
      }
    },
    async getUserRolesInfo(data: any) {
      const res = await getRolesInfo(data)
      console.log(res)
      if (res.code === 200) {
        return res.data
      }
      window.$message.error(res.message)
      return false
    },
    async updateUserRoles(data: any): Promise<boolean> {
      const res = await updateUserRoles(data)
      window.$message.success(res.message)
      return res.code === 200
    },
  },
})
