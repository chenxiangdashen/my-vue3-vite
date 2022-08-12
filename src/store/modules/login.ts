import { defineStore } from "pinia";
import { UserInfoType, ILoginReq } from "../../types/user";
import { TOKEN } from "../../utils/static";
import { useLogin } from "../../api/user";

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
      this[TOKEN] = "1";
      const res = useLogin(params);
      console.log(res);
      window.$message.success(params.username);
    },
  },
});

export default useLoginStore;
