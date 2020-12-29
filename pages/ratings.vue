<template>
  <div class="d-flex justify-center mb-6">
    <div>
      <v-row justify="center">
        <v-col align-self="center">
          <h1 style="text-align: center">
            Rated movies
          </h1>
        </v-col>
      </v-row>
      <v-row align="center" style="max-width: 1220px;">
        <v-col cols="12">
          <v-container fluid>
            <v-row>
              <v-col
                v-for="movie in ratedMovies"
                :key="movie.id"
                cols="12"
              >
                <v-card width="100%" style="padding: 0" max-height="225" :to="movie.to">
                  <v-row dense style="height: 100%" justify="space-between">
                    <v-col cols="2" style="padding: 0">
                      <v-img :src="movie.poster_path" width="150" height="225" />
                    </v-col>
                    <v-col cols="10" align-self="start">
                      <h2>{{ movie.title }}</h2>
                      <h5 style="color: grey">
                        {{ movie.release_date }}
                      </h5>
                      <Buttons :rating="movie.vote_average" :user-rating="movie.rating" style="margin-top: 8%" />
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Buttons from '@/components/liked/Buttons'
import { mapPreviewListFromBackend } from '@/lib/API/movies/mapping'

export default {
  name: 'Ratings',
  components: { Buttons },
  async asyncData ({ params, store }) {
    const ratedMovies = await store.dispatch('movies/listRatedMoviesBackend')
    mapPreviewListFromBackend(ratedMovies)
    return { ratedMovies }
  },
  data () {
    return {
      titleStyle: 'font-size: 16px; line-height: 18px; word-break: break-word; padding: 4px; overflow: hidden; text-overflow: ellipsis;',
      subtitleStyle: 'font-size: 14px; line-height: 18px; word-break: break-word; padding-right: 4px; padding-left: 4px; padding-bottom: 4px; margin-top: 1px;'
    }
  }
}
</script>

<style scoped>

</style>
