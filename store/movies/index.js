export const actions = {
  async getFromBackend ({ commit, state }, id) {
    return await this.$backend.movies.getMovieItem(id)
  },

  async likeMovieBackend ({ commit }, { id, beforeVal }) {
    return await this.$backend.movies.likeMovie(id, beforeVal)
  }
}
