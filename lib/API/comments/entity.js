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

  addComment: async (data, movieId) => {
    return await axios.$post(
      `${backendAddresses.movieSvc}/comments`,
      { data },
      {
        headers: {
          'X-Account': 'bar',
          'X-Account-Id': 1,
          'X-Role': 'standard'
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
          'X-Account': 'bar',
          'X-Account-Id': 1,
          'X-Role': 'standard'
        }
      }
    )
  },

  deleteComment: async (id) => {
    return await axios.delete(
      `${backendAddresses.movieSvc}/comments/${id}`,
      {
        headers: {
          'X-Account': 'bar',
          'X-Account-Id': 1,
          'X-Role': 'standard'
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
          'X-Account': 'bar',
          'X-Account-Id': 1,
          'X-Role': 'standard'
        },
        params: { liked }
      }
    )
  }
})
