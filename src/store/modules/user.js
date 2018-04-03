import StoreUtil from '../../storage/storeutil'
const user = {
  state: {
    user: StoreUtil.findLocal('J_USER', {}),
    account: StoreUtil.getCookie('J_ACCOUNT'),
    userName: StoreUtil.getCookie('J_USERNAME'),
    token: StoreUtil.getCookie('J_TOKEN'),
    msgCount: StoreUtil.findLocal('J_MSGCOUNT', 1)
  },
  mutations: {
    SET_USER (state, user) {
      state.token = user.token
      state.userName = user.name
      state.account = user.account
      StoreUtil.saveLocal('J_USER', user)
      StoreUtil.setCookie('J_ACCOUNT', user.account, 7)
      StoreUtil.setCookie('J_USERNAME', user.name, 7)
      StoreUtil.setCookie('J_TOKEN', user.token, 7)
      StoreUtil.saveLocal('J_MSGCOUNT', 1, 7)
    },
    LOGOUT (state) {
      StoreUtil.removeLocal('J_USER')
      StoreUtil.removeCookie('J_ACCOUNT')
      StoreUtil.removeCookie('J_USERNAME')
      StoreUtil.removeCookie('J_TOKEN')
      StoreUtil.removeLocal('J_MSGCOUNT')
      StoreUtil.removeLocal('J_MENULIST')
      StoreUtil.removeLocal('J_OPENMENULIST')
      StoreUtil.removeLocal('J_CURRENTPATH')
    }
  }
}

export default user
