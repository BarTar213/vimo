export const state = () => ({
  user: Object.create(null),
  dialog: true
})

export const getters = {
  getDialog: (state) => {
    return state.dialog
  }
}

export const mutations = {
  updateDialog: (state, payload) => {
    state.dialog = payload
  }
}
