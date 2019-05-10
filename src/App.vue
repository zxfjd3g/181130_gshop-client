<template>
  <div>
    <router-view/>
    <FootGuide v-show="$route.meta.isShowFoot"/>
  </div>
</template>
<script>
  import FootGuide from 'components/FootGuide/FootGuide.vue'
  import {reqUser} from './api'

  export default {
    name: 'App',

    async mounted () {
      // 触发vuex的action调用: 请求后台接口获取address到state中
      this.$store.dispatch('getAddress')
      this.$store.dispatch('getUser')

      this.$store.dispatch('yyy')
      // this.$store.commit('abc')
    },

    components: {
      FootGuide
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>