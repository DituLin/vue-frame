import VueRouter from 'vue-router'
import {routers} from './router'
import Vue from 'vue'
import iView from 'iview'
import store from '../store'

Vue.use(VueRouter)

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: routers,
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || {x: 0, y: 0}
  }
}

var router = new VueRouter(RouterConfig)

router.afterEach((to) => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

// 跳转前检查登录
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  // 写入面包屑
  store.commit('SET_CURRENTPATH', to)
  // 判断是否在权限范围内
  var token = store.getters.token
  if (to.meta.requireAuth && (token === undefined || token === null || token === '')) {
    window.console.log('relogin')
    // next()
    next({
      path: 'login',
      query: {redirect: to.fullPath}
    })
  } else {
    next()
  }
})

export default router

// // import views
// import LoginView from '@/views/LoginView'
// import DashView from '@/views/DashView'
// import HomeView from '@/views/HomeView'
// import OwnSpace from '@/views/OwnSpace'
//
// import SysUserView from '@/views/system/SysUserView'
// import SysRoleView from '@/views/system/SysRoleView'
// import SysMenuView from '@/views/system/SysMenuView'
//
// import IllegalReport from '@/views/illegal/IllegalReport'
// import IllegalInfo from '@/views/illegal/IllegalInfo'
// import IllegalDeliver from '@/views/illegal/IllegalDeliver'
//
// import ControlDevice from '@/views/control/ControlDevice'
// import ControlWechat from '@/views/control/ControlWechat'
// import ControlRedbag from '@/views/control/ControlRedbag'
// import ControlMessage from '@/views/control/ControlMessage'
//
// import AnalyFund from '@/views/analy/AnalyFund'
// import AnalyIllegal from '@/views/analy/AnalyIllegal'
// import AnalyUserbind from '@/views/analy/AnalyUserbind'
//
// import Page404 from '@/views/system/Page404'
// import Page500 from '@/views/system/Page500'
//
// const routes = [
//   {path: '/login', component: LoginView, name: 'login', meta: {description: '登录', icon: 'ios-color-filter', requireAuth: false}},
//   {
//     path: '/',
//     component: DashView,
//     name: 'dashboard',
//     meta: {description: '工作台', icon: 'ios-home', requireAuth: true},
//     children: [
//       {path: '', component: HomeView, name: 'home', meta: {description: '工作台', icon: 'ios-home', requireAuth: true}},
//       {path: 'ownspace', component: OwnSpace, name: 'ownspace', meta: {description: '个人中心', icon: 'ios-person', requireAuth: true}}
//     ]
//   },
//   {
//     path: '/system',
//     name: 'system',
//     component: DashView,
//     meta: {description: '系统设置', icon: 'ios-gear', requireAuth: true},
//     children: [
//       {path: 'sysuser', component: SysUserView, name: 'sysuser', meta: {description: '用户管理', icon: 'ios-people', requireAuth: true}},
//       {path: 'sysrole', component: SysRoleView, name: 'sysrole', meta: {description: '角色管理', icon: 'ios-pricetag', requireAuth: true}},
//       {path: 'sysmenu', component: SysMenuView, name: 'sysmenu', meta: {description: '应用管理', icon: 'ios-cart', requireAuth: true}}
//     ]
//   },
//   {
//     path: '/illegal',
//     name: 'illegal',
//     component: DashView,
//     meta: {description: '我要举报', icon: 'ios-videocam', requireAuth: true},
//     children: [
//       {path: 'report', component: IllegalReport, name: 'iglreport', meta: {description: '违章审核', icon: 'ios-film', requireAuth: true}},
//       {path: 'info', component: IllegalInfo, name: 'iglinfo', meta: {description: '违法查询', icon: 'ios-filing', requireAuth: true}},
//       {path: 'deliver', component: IllegalDeliver, name: 'igldeliver', meta: {description: '违章认领', icon: 'ios-paperplane', requireAuth: true}}
//     ]
//   },
//   {
//     path: '/control',
//     name: 'control',
//     component: DashView,
//     meta: {description: '全民监督', icon: 'ios-paw', requireAuth: true},
//     children: [
//       {path: 'device', component: ControlDevice, name: 'ctldevice', meta: {description: '设备管理', icon: 'ios-speedometer', requireAuth: true}},
//       {path: 'wechat', component: ControlWechat, name: 'ctlwechat', meta: {description: '微信用户', icon: 'ios-chatbubble', requireAuth: true}},
//       {path: 'redbag', component: ControlRedbag, name: 'ctlredbag', meta: {description: '红包查询', icon: 'ios-flame', requireAuth: true}},
//       {path: 'message', component: ControlMessage, name: 'ctlmessage', meta: {description: '消息推送', icon: 'ios-bell', requireAuth: true}}
//     ]
//   },
//   {
//     path: '/analy',
//     name: 'analy',
//     component: DashView,
//     meta: {description: '统计分析', icon: 'ios-analytics', requireAuth: true},
//     children: [
//       {path: 'fund', component: AnalyFund, name: 'alyfund', meta: {description: '资金流向', icon: 'card', requireAuth: true}},
//       {path: 'illegal', component: AnalyIllegal, name: 'alyillegal', meta: {description: '举报统计', icon: 'ios-albums', requireAuth: true}},
//       {path: 'userbind', component: AnalyUserbind, name: 'alyuserbind', meta: {description: '用户绑定', icon: 'ios-personadd', requireAuth: true}}
//     ]
//   },
//   {
//     path: '/error',
//     name: '错误',
//     component: DashView,
//     meta: {description: '系统设置', requireAuth: false},
//     children: [
//       {path: 'page404', component: Page404, name: 'page404', meta: {description: '404错误', icon: 'flash-off', requireAuth: false}},
//       {path: 'page500', component: Page500, name: 'page500', meta: {description: '500错误', icon: 'flash-off', requireAuth: false}}
//     ]
//   },
//   {path: '*', redirect: {name: 'page404', component: Page404}}
// ]
//
// export default routes
