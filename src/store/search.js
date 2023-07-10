import { reqGetSearchInfo } from "@/api";
const state = {
    searchData: {}
};
const mutations = {
    GET_SEARCH_LIST(state, searchData) {
        state.searchData = searchData;
    }
};
const actions = {
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params);
        if (result.code === 200) {
            commit('GET_SEARCH_LIST', result.data);
        }
    },
};
const getters = {
    goodsList(state) {
        return state.searchData.goodsList || [];
    },
    trademarkList(state) {
        return state.searchData.trademarkList || [];
    },
    attrsList(state) {
        return state.searchData.attrsList || [];
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};