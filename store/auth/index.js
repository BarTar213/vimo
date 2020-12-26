export const state = () => ({
  user: null,
  dialog: true,
  dialogTitle: true
})

export const getters = {
  getDialog: state => () => {
    return state.dialog
  },
  getCurrentUser: state => () => {
    return state.user
  }
}

export const mutations = {
  updateDialog: (state, payload) => {
    state.dialog = payload
  },
  updateUser: (state, user) => {
    state.user = user
  },
  updateDialogTitle: (state, payload) => {
    state.dialogTitle = payload
  },
  updateAuthDialog: (state, payload) => {
    state.dialog = payload
    state.dialogTitle = payload
  }
}

export const actions = {
  async addUserBackend ({ commit, state }, user) {
    return (await this.$backend.users.addUser(user))
  },
  async loginUserBackend ({ commit, state }, user) {
    await this.$backend.users.loginUser(user)

    const data = (await this.$backend.users.getCurrentUser(state))
    commit('updateUser', data)
  },
  async verifyLoginBackend ({ commit, state }, { login, code }) {
    return (await this.$backend.users.verifyLogin(login, code))
  },
  async getCurrentUserBackend ({ commit, state }) {
    return (await this.$backend.users.getCurrentUser())
  }
}
