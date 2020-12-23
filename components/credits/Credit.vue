<template>
  <div>
    <v-row justify="start" align="start">
      <h2>Cast</h2>
    </v-row>
    <v-slide-group
      v-model="model"
      class="pa-4"
      show-arrows
    >
      <v-slide-item
        v-for="cast in credit.cast"
        :key="cast.cast_id"
        v-slot:default="{ active, toggle }"
      >
        <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          class="ma-4"
          height="200"
          width="100"
          @click="toggle"
        >
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
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Credit',
  props: {
    movieId: {
      type: Number,
      default: 0,
      required: true
    }
  },
  async fetch () {
    this.credit = await this.getFromBackend(this.movieId)
  },
  data () {
    return {
      credit: []
    }
  },
  methods: {
    ...mapActions('credits', ['getFromBackend'])
  }
}
</script>

<style scoped>

</style>
