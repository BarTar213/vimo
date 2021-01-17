<template>
  <div class="d-flex justify-center mb-6">
    <div>
      <v-row justify="center">
        <v-col align-self="center">
          <h1 style="text-align: center">
            Movie ranking
          </h1>
        </v-col>
      </v-row>
      <v-row align="center" style="max-width: 1220px;">
        <v-col cols="12">
          <v-container fluid>
            <v-row>
              <v-col
                v-for="(movie, index) in ranking"
                :key="movie.id"
                cols="12"
              >
                <v-card width="100%" style="padding: 0" max-height="225" :to="movie.to">
                  <v-row dense style="height: 100%" justify="space-between">
                    <v-col cols="1" align-self="center">
                      <h1 style="text-align: center; color: #00ACC1">
                        {{ index + 1 }}
                      </h1>
                    </v-col>
                    <v-col cols="2" style="padding: 0">
                      <v-img :src="movie.poster_path" width="150" height="225" />
                    </v-col>
                    <v-col cols="7" align-self="start">
                      <h2>{{ movie.title }}</h2>
                      <h5 style="color: grey">
                        {{ movie.release_date }}
                      </h5>
                    </v-col>
                    <v-col cols="2" align-self="center">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-progress-circular
                            :value="10*movie.vote_average"
                            :width="14"
                            :size="70"
                            color="cyan lighten-3"
                            v-bind="attrs"
                            v-on="on"
                          >
                            {{ movie.vote_average * 10 }}
                          </v-progress-circular>
                        </template>
                        <span>User score</span>
                      </v-tooltip>
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
export default {
  name: 'Ranking',
  async asyncData ({
    params,
    store
  }) {
    const ranking = await store.dispatch('movies/getRankingBackend')
    return { ranking }
  }
}
</script>

<style scoped>

</style>
