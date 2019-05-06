<template>
  <div>
    <router-view/>
    <FootGuide v-show="$route.meta.isShowFoot"/>
  </div>
</template>
<script>
  import FootGuide from 'components/FootGuide/FootGuide.vue'
  import {reqAddress} from './api'

  export default {
    name: 'App',

    async mounted () {
      const result = await reqAddress('115.36867', '40.10038')
      console.log('result', result)
    },

    components: {
      FootGuide
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>