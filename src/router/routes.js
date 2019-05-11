/*
所有路由配置对象的数组
 */
// import MSite from 'pages/MSite/MSite.vue'
// import Search from 'pages/Search/Search.vue'
// import Order from 'pages/Order/Order.vue'
// import Profile from 'pages/Profile/Profile.vue'

/*
路由组件懒加载
  import(模块路径): 被引入模块会被单独打包(拆分打包: code split---代码分割)  ---是懒加载的前提
  路由component配置是一个返回引入模块的函数, 默认不执行, 第一次请求路由时才会执行, 从而去后台请求获取相应打包文件
 */
const MSite = () => import('pages/MSite/MSite.vue')
const Search = () => import('pages/Search/Search.vue')
const Order = () => import('pages/Order/Order.vue')
const Profile = () => import('pages/Profile/Profile.vue')


import Login from 'pages/Login/Login.vue'
import Shop from 'pages/Shop/Shop.vue'
import Goods from 'pages/Shop/Goods/Goods.vue'
import Ratings from 'pages/Shop/Ratings/Ratings.vue'
import Info from 'pages/Shop/Info/Info.vue'

import A from '../pages/test/A.vue'
import B from '../pages/test/B.vue'
import B1 from '../pages/test/B1.vue'
import B2 from '../pages/test/B2.vue'

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
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/goods',
        component: Goods
      },
      {
        path: '/shop/ratings',
        component: Ratings
      },
      {
        path: 'info',
        component: Info
      },
      {
        path: '',
        redirect: '/shop/goods'
      }
    ]
  },

  {
    path: '/a',
    component: A
  },
  {
    path: '/b',
    component: B,
    children: [
      {
        path: '/b/b1',
        component: B1
      },
      {
        path: '/b/b2',
        component: B2
      },
    ]
  },

  // 自动重定向路由
  {
    path: '/',
    redirect: '/msite'
  }
]