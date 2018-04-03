import DashView from '@/views/DashView'
import OwnSpace from '@/views/OwnSpace'
import HomeView from '@/views/HomeView'

// 不作为 DashView 组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  component: () => import('@/views/LoginView'),
  meta: {description: '登录', icon: 'ios-color-filter', requireAuth: false}
}

export const page404 = {
  path: '*',
  redirect: {name: 'page404', component: () => import('@/views/system/Page404')}
}

export const otherRouter = {
  path: '/',
  component: DashView,
  name: 'dashboard',
  meta: {description: '工作台', icon: 'ios-home', requireAuth: true},
  children: [
    {path: '', component: HomeView, name: 'home', meta: {description: '工作台', icon: 'ios-home', requireAuth: true}},
    {path: 'ownspace', component: OwnSpace, name: 'ownspace', meta: {description: '个人中心', icon: 'ios-person', requireAuth: true}}
  ]
}

export const appRouter = [
  {
    path: '/access',
    icon: 'key',
    name: 'access',
    title: '权限管理',
    component: DashView,
    children: [
      { path: 'index', title: '权限管理', name: 'access_index', component: () => import('@/views/access/Access.vue') }
    ]
  },
  {
    path: '/access-test',
    icon: 'lock-combination',
    title: '权限测试页',
    name: 'accesstest',
    access: 0,
    component: DashView,
    children: [
      { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: () => import('@/views/access/AccessTest.vue') }
    ]
  }
]

export const routers = [
  loginRouter,
  otherRouter,
  ...appRouter
]
