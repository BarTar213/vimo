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
          {{ rating }}
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
              <v-icon x-large>
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
              color="cyan lighten-3"
              background-color="grey lighten-1"
              :close-delay="500"
            />
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

export default {
  name: 'Rating',
  props: {
    liked: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      hearIcon: 'mdi-heart-outline',
      value: false,
      userRating: 0,
      color: 'pink lighten-1'
    }
  },
  watch: {
    liked () {
      if (this.liked) {
        this.hearIcon = 'mdi-heart'
      } else {
        this.hearIcon = 'mdi-heart-outline'
      }
    }
  },
  methods: {
    like () {
      this.$emit('like')
    }
  }
}
</script>

<style scoped>
</style>
