<template>
  <div>
    <v-row>
      <v-col align-self="center" cols="2">
        <v-progress-circular
          :value="10*rating"
          :width="10"
          :size="50"
          color="cyan lighten-3"
        >
          {{ rating * 10 }}
        </v-progress-circular>
      </v-col>
      <v-col align-self="center" cols="2">
        <v-menu
          v-model="value"
          :open-on-hover="true"
          :offset-y="true"
          :close-delay="500"
        >
          <template v-slot:activator="{on, attrs}">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon x-large color="amber lighten-2">
                mdi-star
              </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-rating
              v-model="userRating"
              :length="5"
              empty-icon="mdi-star-outline"
              full-icon="mdi-star"
              half-icon="mdi-star-half-full"
              :half-increments="true"
              :hover="true"
              size="30"
              color="amber lighten-2"
              background-color="grey lighten-1"
              :close-delay="500"
            />
            <v-card-actions v-if="userRating!==0" style="margin-top: 5px">
              <v-spacer />
              <v-btn icon @click="deleteRating">
                <v-icon color="red">
                  mdi-trash-can-outline
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-col>
      <v-col align-self="center" cols="2">
        <v-btn
          icon
        >
          <v-icon x-large :color="color" @click="like">
            {{ hearIcon }}
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  name: 'Rating',
  props: {
    movieId: {
      type: Number,
      default: 0
    },
    liked: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      default: 0
    }
  },
  async fetch () {
    if (this.user == null) {
      return
    }
    const data = await this.getRatingBackend(this.movieId)
    this.userRating = data.rating / 2
  },
  data () {
    return {
      hearIcon: 'mdi-heart-outline',
      value: false,
      userRating: 0,
      color: 'pink lighten-1'
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  watch: {
    liked: {
      immediate: true,
      handler () {
        if (this.liked) {
          this.hearIcon = 'mdi-heart'
        } else {
          this.hearIcon = 'mdi-heart-outline'
        }
      }
    },
    userRating: {
      handler () {
        this.addRatingBackend({ movieId: this.movieId, rating: this.userRating * 2 })
      }
    }
  },
  methods: {
    ...mapActions('movies', ['addRatingBackend', 'deleteRatingBackend', 'getRatingBackend']),
    like () {
      this.$emit('like')
    },
    deleteRating () {
      this.deleteRatingBackend(this.movieId)
      this.userRating = 0
    }
  }
}
</script>

<style scoped>
</style>
