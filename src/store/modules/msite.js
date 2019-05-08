/*
首页模块
 */
import {
  reqAddress,
  reqCategorys,
  reqShops
} from '../../api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS
} from '../mutation-types'

const state = {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, // 当前地址信息对象
  categorys: [], // 食品分类数组
  shops: [], // 商家数组
}

const mutations = {
  // 接收地址
  [RECEIVE_ADDRESS] (state, address) { // state是当前模块的状态
    state.address = address
  },
  // 接收商家数组
  [RECEIVE_SHOPS] (state, shops) {
    state.shops = shops
  },
  // 接收分类数组
  [RECEIVE_CATEGORYS] (state, categorys) {
    state.categorys = categorys
  },
}

const actions = {
  // 获取地址的异步action
  async getAddress ({commit, state}) {
    const {longitude, latitude} = state
    // 1. 发送异步ajax请求
    const result = await reqAddress(longitude, latitude)
    // 2. 成功后, 提交mutation
    if(result.code===0) {
      const addess = result.data
      commit(RECEIVE_ADDRESS, addess)
    }

  },

  // 获取食品分类列表的异步action
  async getCategorys ({commit}, callback) {
    // 1. 发送异步ajax请求
    const result = await reqCategorys()
    // 2. 成功后, 提交mutation
    if(result.code===0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys)
      // 更新完状态数据后调用
      typeof callback ==='function' && callback()
    }

  },

  // 获取商家列表的异步action
  async getShops ({commit, state}) {
    const {longitude, latitude} = state
    // 1. 发送异步ajax请求
    const result = await reqShops({longitude, latitude})
    // 2. 成功后, 提交mutation
    if(result.code===0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }

  }
}

const getters = {
  totalShopCount (state) {
    return state.shops.length
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}