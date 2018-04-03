/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = ''
let imgBaseUrl

if (process.env.NODE_ENV === 'development') {
  baseUrl = '/api/'
  imgBaseUrl = 'http://cangdu.org:8001/img/'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://mstest.nicigo.com:9099/'
  imgBaseUrl = 'http://cangdu.org:8001/img/'
}

export {
  baseUrl,
  imgBaseUrl
}
