import {
  mapEntityFromBackend,
  mapPreviewListFromBackend,
  mapTrendingListFromBackend
} from '@/lib/API/movies/mapping'

export const state = () => ({
  trending: [],
  ranking: []
})

export const actions = {
  async getFromBackend ({ commit, state }, id) {
    const movie = await this.$backend.movies.getMovieItem(id)
    return mapEntityFromBackend(movie)
  },

  async likeMovieBackend ({ commit }, { id, beforeVal }) {
    return await this.$backend.movies.likeMovie(id, beforeVal)
  },

  async checkLikedBackend ({ commit, rootState }, id) {
    if (rootState.auth.user == null) {
      return false
    }
    return (await this.$backend.movies.checkLiked(id)).liked
  },

  async listLikedMoviesBackend () {
    return await this.$backend.movies.listLikedMovies()
  },

  searchMoviesBackend ({ commit }, title) {
    return this.$backend.movies.searchMovies(title)
  },

  // ratings
  async getRatingBackend ({ commit, rootState }, movieId) {
    if (rootState.auth.user == null) {
      return false
    }
    return await this.$backend.movies.getRating(movieId)
  },

  async addRatingBackend ({ commit, state }, { movieId, rating }) {
    return await this.$backend.movies.addRating(movieId, rating)
  },

  async deleteRatingBackend ({ commit, state }, movieId) {
    return await this.$backend.movies.deleteRating(movieId)
  },

  async listRatedMoviesBackend ({ commit, state }) {
    return await this.$backend.movies.listRatedMovies()
  },

  // trending
  async listTrendingMoviesBackend ({ commit, state }) {
    if (state.trending.length > 0) {
      return state.trending
    }
    const trending = await this.$backend.movies.listTrendingMovies()
    mapTrendingListFromBackend(trending)
    return trending
  },

  // ranking
  async getRankingBackend ({ commit, state }) {
    if (state.ranking.length > 0) {
      return state.ranking
    }
    const ranking = await this.$backend.movies.getRanking()
    mapPreviewListFromBackend(ranking)
    return ranking
  }
}
