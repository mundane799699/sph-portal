import {
  reqGetCode,
  reqRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout,
} from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";
const state = {
  code: "",
  token: getToken(),
  userInfo: {},
};
const mutations = {
  GET_CODE(state, code) {
    state.code = code;
  },
  USER_LOGIN(state, token) {
    state.token = token;
  },
  GET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  CLEAR(state) {
    state.token = "";
    state.userInfo = {};
    removeToken();
  },
};
const actions = {
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone);
    if (result.code === 200) {
      commit("GET_CODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // 用户注册
  async userRegister({ commit }, user) {
    let result = await reqRegister(user);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // 用户登录
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    if (result.code === 200) {
      commit("USER_LOGIN", result.data.token);
      // 持久化存储token
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code === 200) {
      commit("GET_USER_INFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  async userLogout({ commit }) {
    let result = await reqLogout();
    // action里面不能操作state
    if (result.code === 200) {
      commit("CLEAR");
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
};
const getters = {
  userName(state) {
    return state.userInfo.name;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
