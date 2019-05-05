<template>
  <footer class="footer_guide border-1px">
    <span class="guide_item" :class="{on: $route.path==='/msite'}" @click="goTo('/msite')"><!--动态类名用对象模式: 类名确定, 但不确定有没有-->
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </span>
    <a href="javascript:;" class="guide_item" :class="{on: $route.path==='/search'}"
       @click="goTo('/search')">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </a>
    <a href="javascript:;" class="guide_item" :class="{on: $route.path==='/order'}"
       @click="goTo('/order')">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </a>
    <a href="javascript:;" class="guide_item" :class="{on: $route.path==='/profile'}"
       @click="goTo('/profile')">
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </a>
  </footer>
</template>
<script>
  /*
   所有的组件都有2个属性
     $route: 当前路由信息对象, 包含当前路由相关的信息属性: path/query/params/meta
     $router: 路由器对象, 包含控制路由跳转的方法: push()/replace()/back()

   */
  export default {
    name: 'FootGuide',
    methods: {
      /*
      编程式跳转到指定路由路径
       */
      goTo (path) {
        this.$router.replace(path)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>