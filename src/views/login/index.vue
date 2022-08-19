<template>
  <div class="login-page">
    <div class="wrapper">
      <div class="left">
        <img
          src="@/assets/images/login_banner.png"
          height="380"
          alt="login_banner"
        />
      </div>

      <div class="form-wrapper">
        <h5 class="brand">
          <img src="@/assets/images/logo.svg" width="45" mr-15 alt="logo" />
          {{ title }}
        </h5>
        <div class="form-item" mt-35>
          <input
            v-model="loginInfo.username"
            autofocus
            type="text"
            class="input"
            placeholder="username"
            @keydown.enter="handleLogin"
          />
        </div>
        <div class="form-item" mt-35>
          <input
            v-model="loginInfo.password"
            type="password"
            class="input"
            placeholder="password"
            @keydown.enter="handleLogin"
          />
        </div>
        <div class="form-item" mt-35>
          <button class="submit-btn" @click="handleLogin">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, unref } from "vue";
import { LocationQuery, Router, useRouter } from "vue-router";
import { ILoginReq } from "@/types/user";
import { useLoginStore } from "@/store/modules/login";
import { encode } from "@/utils/code";
import { TOKEN } from "@/utils/static";
import { setToken } from "@/utils/token";

const title = import.meta.env.VITE_APP_TITLE;

const loginInfo = ref<ILoginReq>({
  username: "chenxiang",
  password: "mm123456",
});

const userLoginStore = useLoginStore();

const router: Router = useRouter();
const query: LocationQuery = unref(router.currentRoute).query;

async function handleLogin(e: MouseEvent) {
  e.preventDefault();
  const userInfo: ILoginReq = {
    username: loginInfo.value.username,
    password: encode(loginInfo.value.password),
  };
  const res = await userLoginStore.login(userInfo);
  if (res.code === "200") {
    setToken(res.data);
    window.$message.success("登录成功");
    setTimeout(async () => {
      if (query.redirect) {
        const path: string = query.redirect as string;
        Reflect.deleteProperty(query, "redirect");
        await router.push({ path, query });
      } else {
        await router.push("/");
      }
    }, 999);
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100%;
  background-image: url(@/assets/images/login_bg.jpg);
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper {
  width: 100%;
  max-width: 1020px;
  box-shadow: 1.5px 3.99px 27px 0px rgb(0 0 0 / 10%);
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;

  .left {
    padding: 40px;
    border-right: 1px solid #cccccc5e;
  }
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  .brand {
    width: 100%;
    padding: 15px;
    color: #6a6a6a;
    font-size: 24px;
    font-weight: normal;
    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .form-item {
    width: 100%;
    max-width: 360px;
    height: 50px;
    input {
      width: 100%;
      height: 100%;
      padding: 0 20px;
      border: 1px solid #6a6a6a;
      border-radius: 5px;
      color: $primaryColor;
      font-size: 16px;
      transition: 0.5s;
      &:focus {
        border-color: $primaryColor;
        box-shadow: 0 0 5px $primaryColor;
      }
    }
    button {
      width: 100%;
      height: 100%;

      color: #fff;
      font-size: 16px;
      font-weight: bold;
      border: none;
      border-radius: 5px;
      background-color: $primaryColor;

      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
