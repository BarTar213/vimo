import { mapEntityFromBackend } from '@/lib/API/movies/mapping'

export const actions = {
  async getFromBackend ({ commit, state }, id) {
    const movie = await this.$backend.movies.getMovieItem(id)
    return mapEntityFromBackend(movie)
  },

  async likeMovieBackend ({ commit }, { id, beforeVal }) {
    return await this.$backend.movies.likeMovie(id, beforeVal)
  },

  async checkLikedBackend ({ commit, state }, id) {
    if (state.user == null) {
      return false
    }
    return (await this.$backend.movies.checkLiked(id)).liked
  },

  async listLikedMoviesBackend () {
    return await this.$backend.movies.listLikedMovies()
  },

  searchMoviesBackend ({ commit }, title) {
    return this.$backend.movies.searchMovies(title)
  }
}
