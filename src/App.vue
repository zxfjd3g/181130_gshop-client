<template>
  <div>
    <router-view/>
    <FootGuide v-show="$route.meta.isShowFoot"/>
  </div>
</template>
<script>
  import FootGuide from 'components/FootGuide/FootGuide.vue'

  export default {
    name: 'App',

    data () {
      return {
        firstName: 'A',
        lastName: 'B'
      }
    },

    computed: {
      fullName1 () {
        return this.firstName + '-' + this.lastName
      },

      fullName2: {
        // 初始显示/相关数据发生改变时调用
        get () {
          return this.firstName + '-' + this.lastName
        },

        set (value) {
          const names = value.split('-')
          this.firstName = names[0]
          this.lastName = names[1]
        }
      }

    },

    components: {
      FootGuide
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>