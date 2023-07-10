import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";
const state = {
  cartList: [],
};
const mutations = {
  GET_CART_LIST(state, cartList) {
    state.cartList = cartList;
  },
};
const actions = {
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code === 200) {
      commit("GET_CART_LIST", result.data);
    }
  },
  // 删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // 修改购物车某个产品的选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
  // 删除全部勾选的商品
  deleteAllCheckedCart({ dispatch, getters }) {
    let promiseArr = [];
    getters.cartList.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked === 1
          ? dispatch("deleteCartListBySkuId", item.skuId)
          : "";
      promiseArr.push(promise);
    });
    return Promise.all(promiseArr);
  },
  updateAllCartIsChecked({ dispatch, getters }, isChecked) {
    let promiseArr = [];
    getters.cartList.cartInfoList.forEach((item) => {
      let promise = dispatch("updateCheckedById", {
        skuId: item.skuId,
        isChecked,
      });
      promiseArr.push(promise);
    });
    return Promise.all(promiseArr);
  },
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
