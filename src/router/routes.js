/*
所有路由配置对象的数组
 */
import MSite from 'pages/MSite/MSite.vue'
import Search from 'pages/Search/Search.vue'
import Order from 'pages/Order/Order.vue'
import Profile from 'pages/Profile/Profile.vue'
import Login from 'pages/Login/Login.vue'

export default [
  {
    path: '/msite',  // './msite'
    component: MSite,  // components: 'MSite'
    meta: {
      isShowFoot: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      isShowFoot: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isShowFoot: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShowFoot: true
    }
  },
  {
    path: '/login',
    component: Login
  },

  // 自动重定向路由
  {
    path: '/',
    redirect: '/msite'
  }
]