/*
入口js
 */
import Vue from 'vue'
import { Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import VueScroller from 'vue-scroller'

import App from './App.vue'
import router from './router'
import store from './store'
import Header from 'components/Header/Header.vue'
import Star from 'components/Star/Star.vue'
import CartControl from 'components/CartControl/CartControl.vue'
import Split from 'components/Split/Split.vue'
import './validate'
import './mock/mockServer'
import loading from './common/images/loading.gif'
import './filters'


// 将store保存到Vue上
Vue.store = store

// 声明使用插件
Vue.use(VueLazyload, { // 内部定义一个全局的指令: lazy
  loading,
})
Vue.use(VueScroller) // 内部定义了一个全局组件: scroller


// 注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component(Button.name, Button)
Vue.component('CartControl', CartControl)
Vue.component('Split', Split)

// 给Vue原型对象添加一个vm的$bus的属性
Vue.prototype.$bus = new Vue()

new Vue({
  el: '#app',
  /*components: {
    App   // <App>
  },
  template: '<App/>'*/
  render: h => h(App),
  /*render: function (createElement) {
    return createElement(App)   // <App/>
  }*/
  router, // 配置路由器
  store, // 配置vuex   ===> 所有组件对象都有了一个属性: $store
})

/*
store对象的语法
1). 读取数据
    state
    getters
2). 更新数据
    dispatch()  ===> 触发action调用
    commit()  ===> 触发mutation调用
 */