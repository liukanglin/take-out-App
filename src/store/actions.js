/* vuex 的 actions 模块 */

import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopInfo,
  reqShopRatings,
  reqShopGoods,
  reqSearchShops
} from "../api";
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART, RECEIVE_SEARCH_SHOPS
} from "./mutation_types";

export default {
  // 异步获取地址
  async getAddress({ commit, state }) {
    const geohash = state.latitude + "," + state.longitude;
    const result = await reqAddress(geohash);
    if (result.code === 0) {
      commit(RECEIVE_ADDRESS, { address: result.data });
    }
  },
  // 异步获取分类列表
  async getCategorys({ commit }) {
    const result = await reqCategorys();
    if (result.code === 0) {
      const categorys = result.data;
      commit(RECEIVE_CATEGORYS, { categorys });
    }
  },
  // 异步获取商家列表
  async getShops({ commit, state }) {
    const { latitude, longitude } = state;
    const result = await reqShops({ latitude, longitude });
    if (result.code === 0) {
      const shops = result.data;
      commit(RECEIVE_SHOPS, { shops });
    }
  },
  // 同步记录用户信息
  recordUser({ commit }, userInfo) {
    commit(RECEIVE_USER_INFO, { userInfo });
  },
  // 异步获取用户信息
  async getUser({ commit }) {
    const result = await reqUserInfo();
    if (result.code === 0) {
      const userInfo = result.data;
      commit(RECEIVE_USERINFO, {
        userInfo
      });
    }
  },
  // 异步登出
  async logout({ commit }) {
    const result = await reqLogout();
    if (result.code === 0) {
      commit(RESET_USER_INFO);
    }
  },
  // 异步获取商家信息
  async getShopInfo({ commit }) {
    const result = await reqShopInfo();
    if (result.code === 0) {
      const info = result.data;
      commit(RECEIVE_INFO, { info });
    }
  },
  // 异步获取商家评论信息
  async getShopRatings({ commit }, callback) {
    const result = await reqShopRatings();
    if (result.code === 0) {
      const ratings = result.data;
      commit(RECEIVE_RATINGS, { ratings });
      callback && callback();
    }
  },
  // 异步获取商家商品列表
  async getShopGoods({ commit }, callback) {
    const result = await reqShopGoods();
    if (result.code === 0) {
      const goods = result.data;
      commit(RECEIVE_GOODS, { goods });
      callback && callback();
    }
  },
  // 同步更新food中的count值
  updateFoodCount({ commit }, { isAdd, food }) {
    if (isAdd) {
      // 增加
      commit(INCREMENT_FOOD_COUNT, { food });
    } else {
      // 减少
      commit(DECREMENT_FOOD_COUNT, { food });
    }
  },
  // 同步清空购物车
  clearCart({ commit }) {
    commit(CLEAR_CART)
  },
  // 异步搜索商家列表
  async searchShops({ commit, state }, keyword) {
    const geohash = state.latitude + "," + state.longitude;
    const result = await reqSearchShops(geohash, keyword);
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, { searchShops })
    }
  }
};
