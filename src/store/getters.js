const getters = {
  user: state => state.user.user,
  token: state => state.user.token,
  menuList: state => state.menu.menuList,
  serverUrl: state => state.config.serverUrl,
  loading: state => state.config.loading,
  openMenuList: state => state.menu.openMenuList,
  currentPath: state => state.menu.currentPath,
  msgCount: state => state.user.msgCount
}

export default getters
