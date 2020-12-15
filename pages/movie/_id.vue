<template>
  <section>
    <AppImage :path="movie.poster_path" />
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import AppImage from '@/components/AppImage'

export default {
  name: 'Id',
  components: { AppImage },
  async fetch () {
    this.movie = await this.getFromBackend(this.id)
  },
  data () {
    return {
      id: this.$route.params.id,
      movie: [],
      imageURL: ''
    }
  },
  methods: {
    ...mapActions('movies', ['getFromBackend'])
  }
}
</script>

<style scoped>

</style>
