/*
包含n个用于间接更新状态数据的方法的对象
 */
export default {

  yyy ({commit, state}) {// state是总状态
    console.log('g action yyy()')
    commit('abc') // 触发所有同名的mutation函数调用(有可能更新多个模块的状态数据)
  }
}