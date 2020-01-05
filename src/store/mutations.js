/*
vuex 的 mutations 模块
*/
import Vue from 'vue'
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
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation_types'
export default {
  [RECEIVE_ADDRESS](state, { address }) {
    state.address = address
  },

  [RECEIVE_CATEGORYS](state, { categorys }) {
    state.categorys = categorys
  },

  [RECEIVE_SHOPS](state, { shops }) {
    state.shops = shops
  },

  [RECEIVE_USERINFO](state, { userInfo }) {
    state.userInfo = userInfo
  },

  [RESET_USER_INFO](state) {
    state.userInfo = ''
  },

  [RECEIVE_GOODS](state, { goods }) {
    state.goods = goods
  },

  [RECEIVE_INFO](state, { info }) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, { ratings }) {
    state.ratings = ratings
  },

  [INCREMENT_FOOD_COUNT](state, { food }) {
    if (!food.count) {
      // food.count = 1  新增属性(没有数据绑定)
      /* 1.对象  2.属性名(类型为字符串)  3.属性值   Vue.set 新增的属性可以数据绑定*/
      Vue.set(food, 'count', 1)
      state.cartfoods.push(food)
    } else {
      food.count++
    }
  },

  [DECREMENT_FOOD_COUNT](state, { food }) {
    if (food.count) {
      food.count--
      if (food.count === 0) {
        state.cartfoods.splice(state.cartfoods.indexOf(food), 1)
      }
    }
  },

  [CLEAR_CART](state) {
    // 清空food中得count
    state.cartfoods.forEach(food => food.count = 0);
    // 移除购物车中所有购物项
    state.cartfoods = []
  },
  [RECEIVE_SEARCH_SHOPS](state, { searchShops }) {
    state.searchShops = searchShops
  }
}
