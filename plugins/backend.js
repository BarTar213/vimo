import moviesEntity from '@/lib/API/movies/entity.js'
import commentsEntity from '@/lib/API/comments/entity.js'

export default ({ $axios, store }, inject) => {
  inject('backend', {
    movies: {
      ...moviesEntity($axios, store)
    },
    comments: {
      ...commentsEntity($axios, store)
    }
  })
}
