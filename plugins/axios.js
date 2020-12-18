export default function ({ $axios, store }) {
  $axios.onError((error) => {
    if (error.response.status > 200) {
      store.commit('showMessage', { content: error.response.data.error, color: 'error' })
    }
  })
}
