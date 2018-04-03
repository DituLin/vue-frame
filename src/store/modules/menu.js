import StoreUtil from '../../storage/storeutil'
const menu = {
  state: {
    menuList: StoreUtil.findLocal('J_MENULIST', []),
    openMenuList: StoreUtil.findLocal('J_OPENMENULIST', []),
    currentPath: StoreUtil.findLocal('J_CURRENTPATH', [{title: '工作台', path: '/', name: 'home', icon: 'ios-home'}])
  },
  mutations: {
    SET_MENU (state, menuList) {
      state.menuList = menuList
      // 写入缓存
      StoreUtil.saveLocal('J_MENULIST', state.menuList)
    },
    ADD_OPEN_MENU (state, routeName) {
      var ifLvl1 = false
      // 只增加一级目录
      state.menuList.forEach(menu => {
        if (menu.routeName === routeName) {
          ifLvl1 = true
        }
      })
      if (ifLvl1 && routeName.length > 0 && state.openMenuList.indexOf(routeName) < 0) {
        state.openMenuList.push(routeName)
        StoreUtil.saveLocal('J_OPENMENULIST', state.openMenuList)
      }
    },
    SET_CURRENTPATH (state, router) {
      state.currentPath = StoreUtil.buildBreadCrumb(router)
      StoreUtil.saveLocal('J_CURRENTPATH', state.currentPath)
    }
  }
}

export default menu
