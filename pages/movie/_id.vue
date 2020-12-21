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
    <Comment />
    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-divider
          v-if="item.divider"
          :key="index"
          :inset="item.inset"
        />

        <v-list-item
          v-else
          :key="item.title"
        >
          <v-list-item-avatar>
            <v-img :src="item.avatar" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title" />
            <v-list-item-subtitle v-html="item.subtitle" />
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <div class="d-flex justify-center mb-6">
      <v-row align="center" style="max-width: 1220px;">
        <v-col cols="12">
          <v-row>
            <v-col align-self="center" cols="3">
              <AppImage :path="movie.poster_path" />
            </v-col>
            <v-col align-self="start" cols="9">
              <h1>{{ movie.title }}</h1>
              <div class="facts">
                <span class="fact">{{ movie.release_date }}</span>
                <span class="fact">• {{ movie.genres.join(", ") }}</span>
                <span class="fact">• {{ movie.runtime }}</span>
              </div>
              <h2>Overview</h2>
              <h5>{{ movie.overview }}</h5>
              <Rating :liked="liked" :rating="movie.vote_average" @like="like" />
            </v-col>
          </v-row>
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
import Comment from '@/components/Comment'

export default {
  name: 'Id',
  components: {
    Comment,
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
      liked: false,
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Ali Connors',
          subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Scott',
          subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Sandra Adams',
          subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Trevor Hansen',
          subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Britta Holt',
          subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
        }
      ]
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
