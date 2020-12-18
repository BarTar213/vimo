export const state = () => ({
  drawer: false,
  content: '',
  color: ''
})

export const mutations = {
  updateDrawer: (state) => {
    state.drawer = !state.drawer
  },
  showMessage: (state, payload) => {
    state.content = payload.content
    state.color = payload.color
  }
}
