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
        <span class="toolbar-info">User score</span>
      </v-col>
      <v-col align-self="center" cols="2">
        <v-avatar color="amber lighten-2">
          <h2 style="color: white">
            {{ userRating }}
          </h2>
        </v-avatar>
        <span class="toolbar-info">Your rating</span>
      </v-col>
      <v-col align-self="center" cols="2">
        <v-icon x-large color="pink lighten-1">
          mdi-heart
        </v-icon>
        <span class="toolbar-info">Favourite</span>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'Buttons',
  props: {
    liked: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      default: 0
    },
    userRating: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      hearIcon: 'mdi-heart-outline',
      value: false,
      color: 'pink lighten-1'
    }
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
.toolbar-info{
  color: grey;
  margin-left: 3px;
}
</style>
