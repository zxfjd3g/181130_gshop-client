/*
包含n个用于间接更新状态数据的方法的对象
 */
import {
  reqAddress,
  reqShops,
  reqCategorys
} from '../api'
import {
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECEIVE_ADDRESS
} from './mutation-types'

export default {
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
  async getCategorys ({commit}) {
    // 1. 发送异步ajax请求
    const result = await reqCategorys()
    // 2. 成功后, 提交mutation
    if(result.code===0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys)
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