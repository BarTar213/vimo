export const actions = {
  async getFromBackend ({ commit, state }, id) {
    return await this.$backend.movies.getMovieItem(id)
  }
}
