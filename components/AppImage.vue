<template>
  <v-card max-width="220" min-width="220">
    <v-img
      :src="getImageURL()"
      lazy-src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
      max-width="220"
      max-height="330"
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          />
        </v-row>
      </template>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: 'AppImage',
  props: {
    path: {
      type: String,
      default: ''
    }
  },
  methods: {
    getImageURL () {
      return `https://image.tmdb.org/t/p/w500${this.path}`
    }
  }
}
</script>

<style scoped>

</style>
