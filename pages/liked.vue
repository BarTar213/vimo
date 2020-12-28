<template>
  <div class="d-flex justify-center mb-6">
    <div>
      <v-row justify="center">
        <v-col align-self="center">
          <h1 style="text-align: center">
            Liked movies
          </h1>
        </v-col>
      </v-row>
      <v-row align="center" style="max-width: 1220px;">
        <v-col cols="12">
          <v-container fluid>
            <v-row>
              <v-col
                v-for="movie in likedMovies"
                :key="movie.id"
                class="d-flex child-flex"
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
                      <Buttons :rating="movie.vote_average" style="margin-top: 8%" />
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

import { mapPreviewListFromBackend } from '@/lib/API/movies/mapping'
import Buttons from '@/components/liked/Buttons'

export default {
  name: 'Liked',
  components: { Buttons },
  async asyncData ({ params, store }) {
    // const movies = await $store.actions.movies.listLikedMoviesBackend()
    const likedMovies = await store.dispatch('movies/listLikedMoviesBackend')
    mapPreviewListFromBackend(likedMovies.data)
    // const movie = await $axios.$get(`${backendAddresses.movieSvc}/movies/${params.id}`)
    return { likedMovies: likedMovies.data }
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
