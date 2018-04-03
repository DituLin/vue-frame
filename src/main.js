import Vue from 'vue'
import App from './App'
// iView组件
import iView from 'iview'
import 'iview/dist/styles/iview.css'
// 全局的router
import router from './router/index'
// 全局的store
import store from './store'
// 同步全局的信息
import { sync } from 'vuex-router-sync'
// 全局js-cookie
import VueCookie from 'vue-js-cookie'

import BaiduMap from 'vue-baidu-map'

import {appRouter} from './router/router'

import {mapActions} from 'vuex'

Vue.use(iView)
Vue.use(VueCookie)
Vue.use(BaiduMap, {ak: 'QzGjNhpAYkKVdGE5bgC7lzOWP8QFNhWt'})

sync(store, router)

Vue.config.productionTip = false

// 启动应用
/* eslint-disable no-new */
const vm = new Vue({
  router,
  store: store,
  render: h => h(App),
  methods: {
    ...mapActions([
      'setMenu'
    ])
  },
  create () {
    let tagsList = []
    appRouter.map((item) => {
      if (item.children.length <= 1) {
        tagsList.push(item.children[0])
      } else {
        tagsList.push(...item.children)
      }
      this.setMenu(tagsList)
    })
  }
}).$mount('#app')

export default vm
