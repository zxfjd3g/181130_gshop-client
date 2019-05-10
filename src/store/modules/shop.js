/*
商家模块
 */
import Vue from 'vue'

import {
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT
} from '../mutation-types'

import {
  reqGoods,
  reqRatings,
  reqInfo
} from '../../api'

const state = {
  goods: [], // 商品列表
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
  cartFoods2: [], // 购物车中所有food的数组
}

const mutations = {
  [RECEIVE_INFO] (state, {info}) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },

  [INCREMENT_FOOD_COUNT](state, {food}) {
    if(food.count) {
      food.count++
    } else { // 第一次点+
      /*
      问题: 直接给有数据绑定的对象(响应式对象)添加新的属性, 新的属性没有数据绑定效果
      解决: 使用Vue.set()添加属性, 这个属性就有数据绑定
       */
      // 给food添加一个新的属性: count: 1
      // food.count = 1

      // 为响应式对象添加一个属性，确保新属性也是响应式的，并且能够触发视图更新
      Vue.set( food, 'count', 1)

      // 将food添加到购物车
      state.cartFoods2.push(food)
    }
  },

  [DECREMENT_FOOD_COUNT](state, {food}) {
    if(food.count>0) {
      food.count--

      if(food.count===0) {
        // 删除购物车中的food
        state.cartFoods2.splice(state.cartFoods2.indexOf(food), 1)
      }
    }

  },

  abc (state) {
    console.log('shop mutation abc()', state)
  }
}

const actions = {
  // 异步获取商家信息
  async getInfo({commit}) {
    const result = await reqInfo()
    if(result.code===0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },

  // 异步获取商家评价列表
  async getRatings({commit}) {
    const result = await reqRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
    }
  },

  // 异步获取商家商品列表
  async getGoods({commit}) {
    const result = await reqGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
    }
  },

  // 更新指定food的count
  updateFoodCount ({commit}, {food, isAdd}) {
    if(isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },

  yyy ({commit, state}) {// state是总状态
    console.log('shop action yyy()', state)
    commit('abc') // 触发所有同名的mutation函数调用(有可能更新多个模块的状态数据)
  }
}

const getters = {
  // 购物车中food的数组
  cartFoods (state) {
    let arr = []

    state.goods.forEach(good => {
      good.foods.forEach(food => {
        if(food.count>0) {
          arr.push(food)
        }
      })
    })

    return arr
  },

  // 购物车中food的总数量
  totalCount (state) {
    return state.cartFoods2.reduce((pre, food) => pre + food.count, 0)
  },

  // 购物车中food的总价格
  totalPrice (state) {
    return state.cartFoods2.reduce((pre, food) => pre + food.count * food.price, 0)
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}