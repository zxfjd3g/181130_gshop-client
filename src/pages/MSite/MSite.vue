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
    <scroller>
      <!--首页导航-->
      <nav class="msite_nav">

        <div class="swiper-container" v-if="categorys.length>0">
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

        <img src="./images/msite_back.svg" alt="loading" v-else>

      </nav>
      <!--首页附近商家-->
      <ShopList/>
    </scroller>
  </section>
</template>
<script>
  import {mapState} from 'vuex'
  import Swiper from 'swiper/dist/js/swiper'
  import 'swiper/dist/css/swiper.css'
  import ShopList from 'components/ShopList/ShopList.vue'

  export default {
    // 初始显示之后执行
    mounted () {

      this.$store.dispatch('getShops')
      this.$store.dispatch('getCategorys', () => { // 状态数据, categorys有数据
        // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
        this.$nextTick(() => {
          new Swiper('.swiper-container', { // 配置对象
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      })

      // 创建swiper对象的时机: 必须在列表显示之后创建
      /*setTimeout(() => {
        new Swiper('.swiper-container', { // 配置对象
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
        })
      }, 1000)*/
    },

    computed: {
      // ...mapState(['address', 'categorys']),
      ...mapState({
        // address: 'msite.address'
        address: state => state.msite.address,  // state是vuex的总状态
        categorys: state => state.msite.categorys,
      }),

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

    /*
    问题: 创建swiper后不能正常轮播
    原因：创建太早(必须在列表显示之后)
    解决: watch + $nextTick(callback)  在callback中创建swiper
    */
    watch: {// 监视组件对象的属性

      // 更新状态数据  ==> 同步调用监视回调 ==> 异步更新界面
      /*categorys () { // 状态数据categorys数组有数据了
        // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
        this.$nextTick(() => {
          new Swiper('.swiper-container', { // 配置对象
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      }*/
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