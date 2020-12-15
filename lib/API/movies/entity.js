import { backendAddresses } from '@/lib/API/helpers/backend-address'

export default (axios, store) => ({
  getMovieItem: async (id) => {
    return await axios.$get(
      `${backendAddresses.movieSvc}/movies/${id}`
    )
  }
})
