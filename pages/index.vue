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
      <v-slide-group
        class="pa-4"
        show-arrows
      >
        <v-slide-item
          v-for="movie in trending"
          :key="movie.id"
          v-slot:default="{ active, toggle }"
        >
          <v-card
            class="ma-4"
            height="280"
            width="138"
            :to="movie.to"
            @click="toggle"
          >
            <v-img :src="movie.poster_path" />
            <!--          <v-progress-circular-->
            <!--            :value="10*movie.vote_average"-->
            <!--            :width="6"-->
            <!--            :size="40"-->
            <!--            color="cyan lighten-3"-->
            <!--            :style="voteAverageStyle"-->
            <!--          >-->
            <!--            {{ movie.vote_average*10 }}-->
            <!--          </v-progress-circular>-->
            <v-card-title :style="titleStyle">
              {{ movie.title }}
            </v-card-title>

            <v-card-subtitle :style="subtitleStyle">
              {{ movie.release_date }}
            </v-card-subtitle>
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
              <v-scale-transition>
                <v-icon
                  v-if="active"
                  color="white"
                  size="48"
                  v-text="'mdi-close-circle-outline'"
                />
              </v-scale-transition>
            </v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  async asyncData ({ params, $axios, store }) {
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
