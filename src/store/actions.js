// 设置全局用户信息
export const setUser = ({ commit }, user) => {
  if (user !== undefined && user !== null) {
    commit('SET_USER', user)
  }
}

// 设置全局菜单信息
export const setMenu = ({ commit }, menuList) => {
  if (menuList !== undefined && menuList !== null && menuList.length > 0) {
    commit('SET_MENU', menuList)
  }
}

// 设置loading标志位
export const setLoading = ({ commit }, loading) => {
  commit('SET_LOADING', loading)
}

// 设置全局的打开的菜单列表
export const addOpenMenuList = ({ commit }, routeName) => {
  commit('ADD_OPEN_MENU', routeName)
}

// 设置面包屑的位置
export const setCurrentPath = ({ commit }, router) => {
  commit('SET_CURRENTPATH', router)
}

// 退出
export const logout = ({ commit }) => {
  commit('LOGOUT')
}
