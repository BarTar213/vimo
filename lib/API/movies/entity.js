import { backendAddresses } from '@/lib/API/helpers/backend-address'

export default (axios, store) => ({
  getMovieItem: async (id) => {
    return await axios.$get(
      `${backendAddresses.movieSvc}/movies/${id}`
    )
  },
  likeMovie: async (id, liked) => {
    return await axios.$post(
      `${backendAddresses.movieSvc}/movies/${id}/like`,
      {},
      {
        params: { liked }
      }
    )
  },
  checkLiked: async (id) => {
    return await axios.$get(
      `${backendAddresses.movieSvc}/favourites/${id}`
    )
  },
  listLikedMovies: async () => {
    return await axios.$get(
      `${backendAddresses.movieSvc}/favourites`
    )
  },

  getRating: async (id) => {
    return await axios.$get(
      `${backendAddresses.movieSvc}/movies/${id}/rating`
    )
  },
  addRating: async (id, rating) => {
    return await axios.$post(
      `${backendAddresses.movieSvc}/movies/${id}/rating`,
      { rating }
    )
  },
  deleteRating: async (id) => {
    return await axios.delete(
      `${backendAddresses.movieSvc}/movies/${id}/rating`
    )
  },
  listRatedMovies: async () => {
    return await axios.$get(`${backendAddresses.movieSvc}/rating`)
  },

  searchMovies: (title) => {
    return axios.$get(
      `${backendAddresses.movieSvc}/movies`,
      {
        params: {
          offset: 0,
          limit: 10,
          title
        }
      }
    )
  }
})
