import moviesEntity from '@/lib/API/movies/entity.js'
import commentsEntity from '@/lib/API/comments/entity.js'
import creditsEntity from '@/lib/API/credits/entity.js'

export default ({ $axios, store }, inject) => {
  inject('backend', {
    movies: {
      ...moviesEntity($axios, store)
    },
    comments: {
      ...commentsEntity($axios, store)
    },
    credits: {
      ...creditsEntity($axios, store)
    }
  })
}
