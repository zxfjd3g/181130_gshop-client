/*
所有路由配置对象的数组
 */
import MSite from 'pages/MSite/MSite.vue'
import Search from 'pages/Search/Search.vue'
import Order from 'pages/Order/Order.vue'
import Profile from 'pages/Profile/Profile.vue'

export default [
  {
    path: '/msite',  // './msite'
    component: MSite  // components: 'MSite'
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/profile',
    component: Profile
  },

  // 自动重定向路由
  {
    path: '/',
    redirect: '/msite'
  }
]