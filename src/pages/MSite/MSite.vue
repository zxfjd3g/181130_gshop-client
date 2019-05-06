<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title="address.name || '定位中...'">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">

      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c, index) in categorys" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>

        </div>

        <div class="swiper-pagination"></div>
      </div>

    </nav>
    <!--首页附近商家-->
    <ShopList/>
  </section>
</template>
<script>
  import {mapState} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css'
  import ShopList from 'components/ShopList/ShopList.vue'

  export default {
    // 初始显示之后执行
    mounted () {

      this.$store.dispatch('getShops')
      this.$store.dispatch('getCategorys')

      // 创建swiper对象的时机: 必须在列表显示之后创建
      new Swiper('.swiper-container', { // 配置对象
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
      })
    },

    computed: {
      ...mapState(['address', 'categorys']),

      /*
      用于显示分类轮播的分类的二维数组
      小数组的最大长度是8
       */
      categorysArr () {
        const {categorys} = this
        const bigArr = []
        let smallArr = []

        // 遍历一维数组
        categorys.forEach(c => {

          // 将小数组添加到大数组 (只能一次)
          if(smallArr.length===0) { // 小数组在准备添加第一个分类之前
            bigArr.push(smallArr)

          }

          // 将c保存到小数组中
          smallArr.push(c)

          // 小数组的最大长度是8
          if (smallArr.length===8) { // 一旦满了, 准备一个新的小数组
            smallArr = []
          }

        })

        return bigArr
      }
    },

    components: {
      ShopList
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
</style>