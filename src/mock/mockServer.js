/*
使用mockjs模拟数据接口
 */
import Mock from 'mockjs'
import data from './data.json'  // 内部自动解析为了js对象


// 生成goods的接口
Mock.mock('/goods', {code: 0, data: data.goods})
// 生成ratings的接口
Mock.mock('/ratings', {code: 0, data: data.ratings})
// 生成info的接口
Mock.mock('/info', {code: 0, data: data.info})

// export default xxx
console.log('mockServer...')