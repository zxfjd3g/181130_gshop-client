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
export const reqCategorys = () => ajax(`/index_category`)

// 3、根据经纬度获取商铺列表
export const reqShops = ({latitude, longitude}) => ajax(BASE + `/shops`, {latitude, longitude})