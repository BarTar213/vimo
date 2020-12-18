<template>
  <div>
    <v-icon x-large>
      mdi-star
    </v-icon>
    {{}}
    <v-icon x-large @click="like">
      {{ hearIcon }}
    </v-icon>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Rating',
  props: {
    liked: {
      type: Boolean,
      default: false
    },
    movieId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      hearIcon: 'mdi-heart-outline'
    }
  },
  methods: {
    ...mapActions('movies', ['likeMovieBackend']),
    like () {
      this.likeMovieBackend({ id: this.movieId, beforeVal: this.liked }).then(function () {
        this.liked = !this.liked
        if (this.liked) {
          this.hearIcon = 'mdi-heart'
        } else {
          this.hearIcon = 'mdi-heart-outline'
        }
      }).catch(function (response) {
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>

</style>
