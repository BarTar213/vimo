export const state = () => ({
  drawer: false
})

export const mutations = {
  updateDrawer: (state) => {
    state.drawer = !state.drawer
  }
}
