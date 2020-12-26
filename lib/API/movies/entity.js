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
