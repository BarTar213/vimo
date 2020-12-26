import { backendAddresses } from '@/lib/API/helpers/backend-address'

export default (axios, store) => ({
  getComments: async (movieId) => {
    return await axios.$get(
      `${backendAddresses.movieSvc}/comments`,
      {
        params: { movie_id: movieId }
      }
    )
  },

  addComment: async (content, movieId) => {
    return await axios.$post(
      `${backendAddresses.movieSvc}/comments`,
      { content },
      {
        params: { movie_id: movieId }
      }
    )
  },

  updateComment: async (id, content) => {
    return await axios.$put(
      `${backendAddresses.movieSvc}/comments/${id}`,
      { content }
    )
  },

  deleteComment: async (id) => {
    return await axios.delete(
      `${backendAddresses.movieSvc}/comments/${id}`
    )
  },

  likeComment: async (id, liked) => {
    return await axios.$post(
      `${backendAddresses.movieSvc}/comments/${id}/like`,
      {},
      {
        params: { liked }
      }
    )
  },

  getLikedComments: async (movieId) => {
    if (store.state.auth.user == null) {
      return
    }
    return await axios.$get(
      `${backendAddresses.movieSvc}/favourites/${movieId}/comments`
    )
  }
})
