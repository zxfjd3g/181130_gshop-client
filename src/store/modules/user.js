/*
用户模块
 */
import {
  RECEIVE_USER,
  RESET_USER,
} from '../mutation-types'
import {
  reqUser,
  reqLogout
} from '../../api'

const state = {
  user: {}, // 当前登陆用户
}

const mutations = {
  // 接收用户
  [RECEIVE_USER] (state, user) {
    state.user = user
  },
  // 重置用户
  [RESET_USER] (state) {
    state.user = {}
  },
}

const actions = {
  // 获取用户信息的异步action
  async getUser ({commit}) {
    const result = await reqUser()
    if(result.code===0) {
      const user = result.data
      commit(RECEIVE_USER, user)
    }
  },

  // 退出登陆的异步action
  async logout ({commit}) {
    const result = await reqLogout()
    if(result.code===0) {
      commit(RESET_USER)
    }
  },
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}