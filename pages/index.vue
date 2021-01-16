<template>
  <div class="d-flex justify-center mb-6">
    <div style="max-width: 1220px;">
      <v-row justify="center" dense>
        <v-col align-self="center">
          <h1 style="text-align: center">
            TODAY TRENDING
          </h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          v-for="movie in trending"
          :key="movie.id"
        >
          <v-card
            class="ma-4"
            height="380"
            width="220"
            :to="movie.to"
          >
            <v-img :src="movie.poster_path" />
            <v-card-title :style="titleStyle">
              {{ movie.title }}
            </v-card-title>

            <v-card-subtitle :style="subtitleStyle">
              {{ movie.release_date }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  async asyncData ({
    params,
    $axios,
    store
  }) {
    const trending = await store.dispatch('movies/listTrendingMoviesBackend')
    return { trending }
  },
  data () {
    return {
      titleStyle: 'font-size: 16px; line-height: 18px; word-break: break-word; padding: 4px; overflow: hidden; text-overflow: ellipsis;',
      subtitleStyle: 'font-size: 14px; line-height: 18px; word-break: break-word; padding-right: 4px; padding-left: 4px; padding-bottom: 4px; margin-top: 1px;',
      voteAverageStyle: 'position: absolute; top: 186px; left: 10px;'
    }
  }
}
</script>
