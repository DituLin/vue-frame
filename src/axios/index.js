import axios from 'axios'
import md5 from 'js-md5'
// 全局的vm
import vm from '../main'
// 全局的store
import store from '../store'

import qs from 'qs'

import {baseUrl} from '../config/env'

axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = baseUrl

export default {
  post (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: qs.stringify(data)
      }).then(res => {
        resolve(res)
      })
    })
  },
  get (url, params) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: params // get 请求时带的参数
      }).then(res => {
        resolve(res)
      })
    })
  }
}

// 配置axios的request拦截器
axios.interceptors.request.use(config => {
  vm.$Loading.start()
  // 判断是否是获取时间戳的请求
  var url = config.url
  if (url !== 'system/logout') {
    vm.$store.commit('SET_LOADING', true)
  }
  // 根据不同的请求封装参数
  if (store.getters.token) {
    config.params.token = store.getters.token
  }
  // config.params = requestSign(config.params)
  // 改变url的路径
  // config.url = baseUrl + url
  return config
}, error => {
  vm.$store.commit('SET_LOADING', false)
  console.log(error)
  return {status: '400', errorCode: '9000', errorMsg: error.response !== undefined ? error.response.data.errorMsg : error.message}
})

// 配置axios的respone拦截器
axios.interceptors.response.use(response => {
  var data = response.data
  // console.log('data:' + JSON.stringify(data))
  if (data.status === '1') {
    vm.$store.commit('SET_LOADING', false)
    vm.$Loading.finish()
    return data
  } else {
    vm.$store.commit('SET_LOADING', false)
    vm.$Loading.error()
    // if (data.errorCode === '9004') {
    //   this.logout()
    //   vm.$router.push('/login')
    // } else {
    //   return data
    // }
    return data
  }
}, error => {
  vm.$store.commit('SET_LOADING', false)
  vm.$Loading.error()
  console.log(error)
  return {status: '400', errorCode: '9000', errorMsg: error.response !== undefined ? error.response.data.errorMsg : error.message}
})

// 拼接url sign签名
export function requestSign (params) {
  var keys = Object.keys(params).sort()
  var newParams = {}
  var str = ''
  for (var i = 0; i < keys.length; i++) {
    var value = params[keys[i]]
    if (value === undefined) {
      value = ''
      newParams[keys[i]] = ''
    } else {
      newParams[keys[i]] = params[keys[i]]
    }

    var key = keys[i]
    // 仅能处理数组成员为基本类型或者统一对象类型的数组
    if (Object.prototype.toString.call(value) === '[object Array]') {
      key += '[]'
      // 格式化值
      value = JSON.stringify(value).replace(/},{/g, '}, {')
      if (value.indexOf('{') < 0) {
        value = '[' + params[keys[i]].join(', ') + ']'
      }
    }
    if (i === 0) {
      str += key + '=' + value
    } else {
      str += '&' + key + '=' + value
    }
  }
  var sign = md5(str).toUpperCase()
  console.log('str: ' + str)
  console.log('sign: ' + sign)
  newParams.sign = sign
  return newParams
}
