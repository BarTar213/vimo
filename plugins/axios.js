export default function ({ $axios, store }) {
  $axios.onError((error) => {
    if (error.config.url === '/usersvc/current') {
      return Promise.resolve(true)
    }
    if (error.response.status === 403) {
      store.commit('auth/updateAuthDialog', true)
      return Promise.resolve(true)
    }
    if (error.response.status > 200) {
      store.commit('showMessage', { content: error.response.data.error, color: 'error' })
      return Promise.resolve(true)
    }
  })
}
