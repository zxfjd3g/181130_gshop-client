<template>
  <div>
    <ShopHeader/>

    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>

    <router-view/>
  </div>
</template>
<script>
  import ShopHeader from 'components/ShopHeader/ShopHeader.vue'

  import {reqGoods, reqInfo, reqRatings} from '../../api'

  export default {
    name: 'Shop',

    async mounted () {
      this.$store.dispatch('getInfo')
      this.$store.dispatch('getGoods')
      this.$store.dispatch('getRatings')

      /*const result1 = await reqGoods()
      const result2 = await reqInfo()
      const result3 = await reqRatings()
      const results = await Promise.all([reqGoods(), reqInfo(), reqRatings()])
      const goods = results[0].data
      const info = results[1].data
      const ratings = results[2].data
      console.log(goods, info, ratings)*/
    },

    components: {
      ShopHeader
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>