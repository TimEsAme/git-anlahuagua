import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
import { constantRoutes } from "@/router/routes";
import type {
  LoginFormData,
  LoginResponseData,
  UserInfoResponseData,
} from "@/api/user/type";

const useUserStore = defineStore("User", {
  state() {
    return {
      token: "",
      routesMenu: constantRoutes,
      username: "",
      avatar: "",
    };
  },
  persist: {
    pick: ["token"],
  },
  actions: {
    // 登录
    async userLogin(data: LoginFormData) {
      const res: LoginResponseData = await reqLogin(data);
      if (res.code === 200) {
        this.token = res.data;
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },

    // 获取用户信息
    async userInfo(data: any) {
      const res: UserInfoResponseData = await reqUserInfo(data);
      if (res.code === 200) {
        this.username = res.data.name;
        this.avatar = res.data.avatar;
        return "ok";
      } else {
        return Promise.reject(res.message);
      }
    },

    // 退出登录
    async userLogOut(data: any) {
      let res: any = await reqLogout(data);
      console.log(res);
      if (res.code == 200) {
        this.username = "";
        this.avatar = "";
        this.token = "";
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
  },
  getters: {},
  // 别全持久化,持久化token就好
  // persist: {
  //   path: ["token"],
  // },
  // persist: true,
});

export default useUserStore;
