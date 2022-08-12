import { defineStore } from "pinia";
import { UserInfoType, LoginParams } from "../../types/user";
import { TOKEN } from "../../utils/static";

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
    async login(params: LoginParams) {
      this[TOKEN] = "1";
      window.$message.success(params.username);
    },
  },
});

export default useLoginStore;
