import { backendAddresses } from '@/lib/API/helpers/backend-address'
import { authHeaders } from '@/lib/API/helpers/auth-headers'

export default (axios, store) => ({
  getComments: async (movieId) => {
    return await axios.$get(
      `${backendAddresses.movieSvc}/comments`,
      {
        params: { movie_id: movieId }
      }
    )
  },

  addComment: async (data, movieId) => {
    return await axios.$post(
      `${backendAddresses.movieSvc}/comments`,
      { data },
      {
        headers: {
          authHeaders
        },
        params: { movie_id: movieId }
      }
    )
  },

  updateComment: async (id, data) => {
    return await axios.$put(
      `${backendAddresses.movieSvc}/comments/${id}`,
      { data },
      {
        headers: {
          authHeaders
        }
      }
    )
  },

  deleteComment: async (id) => {
    return await axios.delete(
      `${backendAddresses.movieSvc}/comments/${id}`,
      {
        headers: {
          authHeaders
        }
      }
    )
  },

  likeComment: async (id, liked) => {
    return await axios.$post(
      `${backendAddresses.movieSvc}/comments/${id}/like`,
      {},
      {
        headers: {
          authHeaders
        },
        params: { liked }
      }
    )
  }
})
