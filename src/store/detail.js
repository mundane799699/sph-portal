import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
import { getUUID } from "@/utils/uuid_token";
const state = {
  goodsInfo: {},
  uuid_token: getUUID(),
};
const mutations = {
  GET_GOODS_INFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo;
  },
};
const actions = {
  async getGoodsInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code === 200) {
      commit("GET_GOODS_INFO", result.data);
    }
  },
  // 将产品添加到购物车中
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },
};
const getters = {
  categoryView(state) {
    // 至少是一个空对象，不然categoryView.category1Name读取的是undefined.category1Name会报错
    return state.goodsInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
