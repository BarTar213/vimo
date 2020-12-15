<template>
  <div />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Id',
  async fetch () {
    this.movie = await this.getFromBackend(this.id)
  },
  data () {
    return {
      id: this.$route.params.id,
      movie: []
    }
  },
  methods: {
    ...mapActions('movies', ['getFromBackend'])
  }
}
</script>

<style scoped>

</style>
