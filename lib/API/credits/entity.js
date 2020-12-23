import { backendAddresses } from '@/lib/API/helpers/backend-address'

export default (axios, store) => ({
  getCredits: async (movieId) => {
    return await axios.$get(
      `${backendAddresses.movieSvc}/movies/${movieId}/credits`
    )
  }
})
