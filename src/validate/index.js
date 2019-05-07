/*
vee-validate使用
 */
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate)


// 提示信息本地化
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    phone: '手机号',
    code: '验证码'
  }
})

// 自定义验证规则
VeeValidate.Validator.extend('mobile', {
  validate: value => { // 进行验证的回调
    return /^1\d{10}$/.test(value)
  },
  getMessage: field => field + '必须是11位数字' // 返回提示信息的回调
})

/*
使用vee-validate
1. 使用内置验证规则进行验证
2. 本地化提示
3. 自定义验证规则
 */