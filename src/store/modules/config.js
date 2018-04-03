const config = {
  state: {
    serverUrl: 'http://localhost:8888/boot/',
    loading: false
  },
  mutations: {
    SET_LOADING (state, loading) {
      state.loading = loading
    }
  }
}

export default config
