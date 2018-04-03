import VueCookie from 'vue-js-cookie'
const storeUtil = {}

// 判断对象是否为空
storeUtil.isEmpty = function (val) {
  return val === undefined || val === 'undefined' || val === '' || val === null || val === 'null'
}

// 从localstorage取出的数据是否为空
storeUtil.isLocalEmpty = function (key) {
  return storeUtil.isEmpty(key) || window.localStorage.getItem(key) === undefined || window.localStorage.getItem(key) === 'undefined' || window.localStorage.getItem(key) === '' || window.localStorage.getItem(key) === null
}

// 从sessionstorage取出的数据是否为空
storeUtil.isSessionEmpty = function (key) {
  return storeUtil.isEmpty(key) || window.sessionStorage.getItem(key) === undefined || window.sessionStorage.getItem(key) === 'undefined' || window.sessionStorage.getItem(key) === '' || window.sessionStorage.getItem(key) === null
}

// 设置文档的标题
storeUtil.title = function (title) {
  title = title || 'vue-frame'
  window.document.title = title
}

// 存储到localstorage中
storeUtil.saveLocal = function (key, val) {
  window.localStorage.setItem(key, JSON.stringify(val))
}

// 存储到sessionstorage中
storeUtil.saveSession = function (key, val) {
  window.sessionStorage.setItem(key, JSON.stringify(val))
}

// 从localstorage中取
storeUtil.findLocal = function (key, def) {
  return !storeUtil.isLocalEmpty(key) ? JSON.parse(window.localStorage.getItem(key)) : def
}

// 从sessionstorage中取
storeUtil.findSession = function (key, def) {
  return !storeUtil.isSessionEmpty(key) ? JSON.parse(window.sessionStorage.getItem(key)) : def
}

// 从localstorage中删除
storeUtil.removeLocal = function (key) {
  window.localStorage.removeItem(key)
}

// 从sessionstorage中删除
storeUtil.removeSession = function (key) {
  window.sessionStorage.removeItem(key)
}

// 从cookie里取值
storeUtil.getCookie = function (key) {
  if (storeUtil.isEmpty(key)) {
    return ''
  } else {
    return VueCookie.getJSON(key)
  }
}

// 把值写入到cookie
storeUtil.setCookie = function (key, val, expire) {
  val = val || ''
  expire = expire || 7
  VueCookie.set(key, val, expire)
}

// 从cookie删除值
storeUtil.removeCookie = function (key) {
  VueCookie.remove(key)
}

// 根据routername获取到的router去生成面包屑的数组
storeUtil.buildBreadCrumb = function (router) {
  var currentPath = []
  if (storeUtil.isEmpty(router) || router.fullPath === '/') {
    currentPath = [{title: '工作台', path: '/', name: 'home', icon: 'ios-home'}]
  } else {
    var matchs = router.matched
    matchs.forEach((match, index) => {
      currentPath.push({
        title: match.meta.description,
        path: match.path,
        name: match.name,
        icon: match.meta.icon
      })
    })
  }
  return currentPath
}

export default storeUtil
