export const state = () => ({
  user: Object.create(null),
  dialog: true
})

export const getters = {
  getDialog: (state) => {
    return state.dialog
  },
  getCurrentUser: (state) => {
    return state.user
  }
}

export const mutations = {
  updateDialog: (state, payload) => {
    state.dialog = payload
  }
}

export const actions = {
  async addUserBackend ({ commit, state }, user) {
    return (await this.$backend.users.addUser(user))
  },
  async loginUserBackend ({ commit, state }, user) {
    return (await this.$backend.users.loginUser(user))
  },
  async verifyLoginBackend ({ commit, state }, { login, code }) {
    return (await this.$backend.users.verifyLogin(login, code))
  },
  async getCurrentUserBackend ({ commit, state }) {
    return (await this.$backend.users.getCurrentUser())
  }
}
