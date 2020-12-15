import moviesEntity from '@/lib/API/movies/entity.js'

export default ({ $axios, store }, inject) => {
  inject('backend', {
    movies: {
      ...moviesEntity($axios, store)
    }
  })
}
