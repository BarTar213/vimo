<template>
  <v-row dense>
    <v-col>
      <v-btn width="24px" height="24px" icon @click="like">
        <v-icon small :color="likedColor">
          mdi-thumb-up
        </v-icon>
      </v-btn>
      <span style="position: center; margin-right: 8px">{{ likes }}</span>
      <v-btn width="24px" height="24px" icon>
        <v-icon small :color="dislikedColor" @click="dislike">
          mdi-thumb-down
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'CommentToolbar',
  props: {
    likes: {
      type: Number,
      default: 0
    },
    liked: {
      type: Boolean,
      default: false
    },
    disliked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    likedColor () {
      if (this.liked) {
        return 'cyan lighten-2'
      }
      return ''
    },
    dislikedColor () {
      if (this.disliked) {
        return 'cyan lighten-2'
      }
      return ''
    }
  },
  methods: {
    like () {
      this.$emit('like')
    },
    dislike () {
      this.$emit('dislike')
    }
  }
}
</script>

<style scoped>

</style>
