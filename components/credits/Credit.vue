<template>
  <div>
    <v-row justify="start" align="start">
      <h2>Cast</h2>
    </v-row>
    <v-slide-group
      class="pa-4"
      show-arrows
    >
      <v-slide-item
        v-for="cast in credit.cast"
        :key="cast.cast_id"
        v-slot:default="{ active, toggle }"
      >
        <v-card
          class="ma-4"
          height="261"
          width="138"
          @click="toggle"
        >
          <v-img :src="cast.profile_path" />
          <v-card-title :style="titleStyle">
            {{ cast.name }}
          </v-card-title>

          <v-card-subtitle :style="subtitleStyle">
            {{ cast.character }}
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
      credit: [],
      titleStyle: 'font-size: 16px; line-height: 18px; word-break: break-word; padding: 4px; overflow: hidden; text-overflow: ellipsis;',
      subtitleStyle: 'font-size: 14px; line-height: 18px; word-break: break-word; padding-right: 4px; padding-left: 4px; padding-bottom: 4px; margin-top: 1px;'
    }
  },
  methods: {
    ...mapActions('credits', ['getFromBackend'])
  }
}
</script>

<style scoped>
.title{
  font-size: 1em;
  margin: 0;
  padding-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  list-style-type: none;
  list-style-position: inside;
  box-sizing: border-box;
}
</style>
