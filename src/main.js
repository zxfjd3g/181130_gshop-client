/*
入口js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'

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
})
