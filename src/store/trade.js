import { reqAddressInfo, reqOrderInfo } from "@/api";
const state = {
  address: [],
  orderInfo: {},
};
const mutations = {
  GET_USER_ADDRESS(state, address) {
    state.address = address;
  },
  GET_ORDER_INFO(state, orderInfo) {
    state.orderInfo = orderInfo;
  },
};
const actions = {
  // 获取用户地址信息
  async getUserAddress({ commit }) {
    let result = await reqAddressInfo();
    if (result.code === 200) {
      commit("GET_USER_ADDRESS", result.data);
    }
  },
  // 获取商品清单数据
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo();
    if (result.code === 200) {
      commit("GET_ORDER_INFO", result.data);
    }
  },
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
