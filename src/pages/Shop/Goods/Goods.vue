<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <!--current   currentIndex: 当前分类下标-->
          <li class="menu-item" v-for="(good, index) in goods"
              :key="good.name" :class="{current: currentIndex===index}" @click="selectItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="good in goods" :key="good.name">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  export default {

    data () {
      return {
        scrollY: 0, // 右侧列表滑动的Y轴坐标: srollY  在右侧滑动过程中不断变化
        tops: [], // 右侧所有分类的top的数组: tops  列表显示确定其值
      }
    },

    computed: {
      ...mapState({
        goods: state => state.shop.goods
      }),

      // 当前分类的下标
      currentIndex () {
        // 取出相关数据
        const {scrollY, tops} = this
        // 计算得到结果并返回
        /*
        tops:  [0, 4, 9, 15, 18]
        scrollY: [top, nextTop)
         */
        const index = tops.findIndex((top, index) => {
          return scrollY>=top && scrollY<tops[index+1]
        })

        // 如果前后产生index不同
        if(this.index!==index && this.leftScroll) {
          // 保存index
          this.index = index

          // 得到对应的左侧分类li
          const li = this.$refs.leftUl.children[index]
          //当当前分类下标发生改变时, 让左侧列表滑动当前分类的位置
          this.leftScroll.scrollToElement(li, 300)
        }



        return index
      }
    },

    methods: {
      // 读取右侧所有分类的top值的数组
      _initTops () {
        const tops = []
        let top = 0
        tops.push(top)
        // 得到所有li
        const lis = this.$refs.rightUl.children
        Array.from(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })
        
        // 更新tops状态
        this.tops = tops
        console.log('tops', tops)
      },

      // 初始化滚动
      _initScroll () {
        this.leftScroll = new BScroll('.menu-wrapper', { // better-scroll禁用了原生 dom事件
          click: true, // 标识分发自定义click事件
        })
        this.rightScroll = new BScroll('.foods-wrapper', {
          click: true,
          probeType: 1  // 非实时, 触摸
          // probeType: 2  // 实时, 触摸
          // probeType: 3    // 实时, 触摸/惯性
        })

        // 给右侧列表绑定scroll监听
        this.rightScroll.on('scroll', ({x, y}) => {
          console.log('scroll', x, y)
          this.scrollY = Math.abs(y)
        })
        // 给右侧列表绑定scrollEnd监听
        this.rightScroll.on('scrollEnd', ({x, y}) => {
          console.log('scrollEnd', x, y)
          this.scrollY = Math.abs(y)
        })
      },

      // 点击左侧分类项的回调
      selectItem (index) {
        // alert(index)

        // 得到对应的top
        const top = this.tops[index]

        // 立即更新scrollY为目标位置的值
        this.scrollY = top

        // 让右侧列表滑动到对应位置
        this.rightScroll.scrollTo(0, -top, 300)
      }
    },

    watch: {
      goods () { // goods状态数据更新了
        this.$nextTick(() => { // 界面更新 ---列表显示了
          this._initScroll()
          this._initTops()
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
