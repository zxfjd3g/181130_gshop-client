/*
自定义过滤器
 */
import Vue from 'vue'
// import moment from 'moment'
import format from 'date-fns/format'

Vue.filter('dateFormat', function (value, formatString='YYYY-MM-DD HH:mm:ss') {
  // return moment(value).format(formatString)
  return format(value, formatString)
})