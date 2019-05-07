/*
包含h个接口请求函数的模块
每个函数返回promise
 */
import ajax from './ajax'

// const BASE = 'http://localhost:5000'

const BASE = '/api'

// 1、根据经纬度获取位置详情
export const reqAddress = (longitude, latitude) => ajax(BASE + `/position/${latitude},${longitude}`)

// 2. 获取食品分类列表
export const reqCategorys = () => ajax(BASE + `/index_category`)

// 3、根据经纬度获取商铺列表
export const reqShops = ({latitude, longitude}) => ajax(BASE + `/shops`, {latitude, longitude})


// 用户名密码登陆
export const reqSendCode = (phone) => ajax(BASE + '/sendcode', {phone})
// 发送短信验证码
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE + `/login_pwd`, {name, pwd, captcha}, 'POST')
// 手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(BASE + '/login_sms', {phone, code}, 'POST')
// 根据会话获取用户信息
export const reqUser = () => ajax(BASE + '/userinfo')