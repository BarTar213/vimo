<template>
  <div>
    <div class="poster">
      <v-img
        :src="backdropURL"
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
    <div class="d-flex justify-center mb-6">
      <v-row align="center" style="max-width: 1220px;">
        <v-col cols="12">
          <v-row>
            <v-col align-self="center" cols="3" style="min-width: 220px">
              <AppImage :path="movie.poster_path" />
            </v-col>
            <v-col align-self="start" cols="9">
              <h2>Overview</h2>
              <h5>{{ movie.overview }}</h5>
              <Rating :liked="liked" :rating="movie.vote_average" style="margin-top: 10px; margin-bottom: 10px" @like="like" />
              <v-divider />
              <MovieInfo :movie="movie" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <div class="d-flex justify-center mb-6">
      <v-row align="center" style="max-width: 1220px;">
        <v-col cols="12">
          <h1>Comments</h1>
          <CommentList :movie-id="movie.id" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AppImage from '@/components/AppImage'
import Rating from '@/components/Rating'
import MovieInfo from '@/components/MovieInfo'
import CommentList from '@/components/CommentList'

export default {
  name: 'Id',
  components: {
    CommentList,
    MovieInfo,
    Rating,
    AppImage
  },
  async fetch () {
    this.movie = await this.getFromBackend(this.id)
    this.liked = await this.checkLikedBackend(this.id)

    this.backdropURL = `http://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${this.movie.backdrop_path}`
  },
  data () {
    return {
      id: this.$route.params.id,
      movie: [],
      backdropURL: '',
      liked: false
    }
  },
  computed: {
    releaseDate () {
      const date = new Date(Date.parse(this.movie.release_date))
      return date.toLocaleDateString()
    }
  },
  methods: {
    ...mapActions('movies', ['getFromBackend', 'checkLikedBackend', 'likeMovieBackend']),
    toDate () {
      const date = new Date(Date.parse(this.movie.release_date))
      return date.toLocaleDateString()
    },
    genreArray () {
      const genres = []
      for (const genre of this.movie.genres) {
        genres.push(genre.name)
      }

      return genres.join(', ')
    },
    convertTime (time) {
      const hours = Math.floor(time / 60)
      const minutes = time % 60
      let result = ''
      if (hours > 0) {
        result += hours + 'h '
      }
      return result + minutes + 'm'
    },
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
