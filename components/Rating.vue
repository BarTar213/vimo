<template>
  <div>
    <v-icon x-large>
      mdi-star
    </v-icon>
    <h1>{{ rating }}</h1>
    <v-btn
      icon
    >
      <v-icon x-large @click="like">
        {{ hearIcon }}
      </v-icon>
    </v-btn>
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
      hearIcon: 'mdi-heart-outline'
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
