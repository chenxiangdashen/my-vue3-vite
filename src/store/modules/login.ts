import { defineStore } from "pinia";
import { UserInfoType, ILoginReq } from "../../types/user";
import { TOKEN } from "../../utils/static";
import { login } from "../../api/user";
import { router } from "../../router/index";

const useLoginStore = defineStore({
  id: "login",
  state: () => {
    return {
      [TOKEN]: "",
      userInfo: {
        avatar: "",
        username: "",
        signature: "",
      } as UserInfoType,
    };
  },

  actions: {
    async login(params: ILoginReq) {
      const res = await login(params);
      return res;
    },
  },
});

export { useLoginStore };
