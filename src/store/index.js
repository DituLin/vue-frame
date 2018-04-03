import Vue from 'vue'
import Vuex from 'vuex'
// modules
import user from './modules/user'
import menu from './modules/menu'
import config from './modules/config'

// getters
import getters from './getters'
// actions
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    user,
    menu,
    config
  }
})
