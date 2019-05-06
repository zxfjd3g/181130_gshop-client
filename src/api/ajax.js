/*
能发送ajax请求的函数
函数的返回值是promise
封装axios + Promise
    1). 统一处理请求异常
    2). 异常获取的不是response, 而是response.data

 */
import axios from 'axios'

export default function ajax(url, data={}, method='GET') {

  return new Promise((resolve, reject) => {
    // 执行异步ajax请求
    let promise
    if(method==='GET') {
      promise = axios.get(url,  { // 配置对象
        params: data// 指定query参数
      })
    } else {
      promise = axios.post(url, data)
    }

    promise.then(response => { // 请求成功, 调用resolve(response.data)
      resolve(response.data)
    }).catch(error => {  // 请求出错了, 不调用reject(), 直接提示(外部不需要处理异常)
      alert('请求出错: ' + error.message)
    })
  })
}
