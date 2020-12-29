<template>
  <div>
    <div class="poster">
      <v-img
        :src="movie.backdrop_path"
        gradient="90deg, rgba(0,0,0,1) 12%, rgba(255,255,255,0) 50%, rgba(0,0,0,1) 88%"
        max-height="500"
      >
        <div class="d-flex justify-center mb-6">
          <v-row align="center" style="max-width: 1220px;">
            <v-col cols="12">
              <v-row class="title">
                <v-col align-self="center" cols="12">
                  <h1 style="color: white">
                    {{ movie.title.toUpperCase() }}
                  </h1>
                  <div class="facts">
                    <span class="fact">{{ movie.release_date }}</span>
                    <span class="fact">• {{ movie.genres.join(", ") }}</span>
                    <span class="fact">• {{ movie.runtime }}</span>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-img>
    </div>
    <div class="d-flex justify-center mb-6" style="margin-top: 20px">
      <v-row align="center" style="max-width: 1220px;">
        <v-col cols="12">
          <v-row style="margin-bottom: 10px">
            <v-col align-self="center" cols="3" style="min-width: 220px">
              <AppImage :path="movie.poster_path" />
            </v-col>
            <v-col align-self="start" cols="9">
              <h2>Overview</h2>
              <h5>{{ movie.overview }}</h5>
              <Rating :liked="liked" :rating="movie.vote_average" style="margin-top: 10px; margin-bottom: 10px" @like="like" />
              <v-divider style="margin-bottom: 10px" />
              <MovieInfo :movie="movie" />
            </v-col>
          </v-row>
          <v-divider />
        </v-col>
      </v-row>
    </div>
    <div class="d-flex justify-center mb-6">
      <v-row align="center" style="max-width: 1220px;">
        <v-col cols="12">
          <v-spacer />
          <Credit :movie-id="movie.id" />
          <CommentList :movie-id="movie.id" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapEntityFromBackend } from '@/lib/API/movies/mapping'
import { backendAddresses } from '@/lib/API/helpers/backend-address'
import AppImage from '@/components/AppImage'
import Rating from '@/components/Rating'
import MovieInfo from '@/components/MovieInfo'
import CommentList from '@/components/comment/CommentList'
import Credit from '@/components/credits/Credit'

export default {
  name: 'Id',
  components: {
    Credit,
    CommentList,
    MovieInfo,
    Rating,
    AppImage
  },
  async fetch () {
    // this.liked = await this.checkLikedBackend(this.id)
  },
  async asyncData ({ params, $axios, store }) {
    const movie = await $axios.$get(`${backendAddresses.movieSvc}/movies/${params.id}`)
    mapEntityFromBackend(movie)
    const liked = await store.dispatch('movies/checkLikedBackend', params.id)
    return { movie, liked }
  },
  data () {
    return {
      id: this.$route.params.id,
      backdropURL: ''
    }
  },
  fetchOnServer: true,
  methods: {
    ...mapActions('movies', ['getFromBackend', 'checkLikedBackend', 'likeMovieBackend']),
    like () {
      this.likeMovieBackend({
        id: this.movie.id,
        beforeVal: this.liked
      })
        .then(() => {
          this.liked = !(this.liked)
        })
    }
  }
}
</script>

<style scoped>
.facts {
  display: flex;
  margin-top: 10px;
}

.fact {
  display: inline-flex;
  white-space: nowrap;
  align-items: center;
  align-content: center;
  padding: 0.06em 4px 0.15em 4px !important;
  line-height: 1;
  color: gray;
  font-size: medium;
}

.poster {
  width: 100%;
  max-height: 500px;
}

.title{
  position: absolute;
  bottom: 20px;
}

.background-gradient {
  background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0.5046393557422969) 50%, rgba(0, 0, 0, 1) 100%);
}
</style>
