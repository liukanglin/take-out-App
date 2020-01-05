/* 
  ajax请求函数模块
*/

import axios from 'axios'

export default function ajax(url = "", data = {}, type = "GET") {
  return new Promise((resolve, reject) => {
    let promise
    if (type === "GET") {
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        // 截取参数最后一位 & lastIndexOf从后面开始查询 找到返回索引号 找不到返回-1
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, data)
    }
    promise.then(response => resolve(response.data)).catch(error => reject(error))
  })
}


/* export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000/api/w1",
    timeout: 5000
  });
  // 2. axios的拦截器
  instance.interceptors.request.use(
    config => {
      // 请求成功
      return config;
    },
    // 请求失败
    err => {}
  );
  // 2.1 响应拦截
  instance.interceptors.response.use(
     // 响应成功
    res => {
      return res.data;
    },
    // 响应失败
    err => {}
  );
  // 3. 发送真正的网络请求
  return instance(config);
} */
