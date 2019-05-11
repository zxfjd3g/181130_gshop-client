/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

// 声明使用vue插件
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history', // 去掉了路由路径中的#
  // 配置应用中所有路由
  routes
})

const paths = ['/a', '/b']

// 注册一个全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('g beforeEach', to, from)
  // 请求的路径是需要检查的路径
  const path = to.path
  if(paths.indexOf(path)!==-1) { // 需要检查
    // 检查用户是否登陆, 如果没有登陆, 自动跳转到login
    if(!Vue.store.state.user.user._id) {
      return next('/login')
    }
  }
  // 直接放行
  next()
})

export default router