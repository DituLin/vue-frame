import axios from '../axios/index'

// 登录
export const userLogin = (account, password) => {
  var params = {'phoneNum': account, 'password': password}
  return axios.post('user/accountLogin', params)
}

// 退出
export const userLogout = (account) => {
  var params = {'account': account}
  return axios.post('system/logout', params)
}
