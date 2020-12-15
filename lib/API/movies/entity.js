import { backendAddresses } from '@/lib/API/helpers/backend-address'

export default (axios, store) => ({
  getMovieItem: async (id) => {
    console.log(`${backendAddresses.movieSvc}/movies/${id}`)
    return await axios.$get(
      `${backendAddresses.movieSvc}/movies/${id}`
    )
  }
})
