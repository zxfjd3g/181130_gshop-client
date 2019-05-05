/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

// 声明使用vue插件
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history', // 去掉了路由路径中的#
  // 配置应用中所有路由
  routes
})