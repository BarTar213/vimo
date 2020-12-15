<template>
  <div />
</template>

<script>
export default {
  name: 'Id',
  async fetch () {
    this.movie = await fetch(
      `http://localhost:8080/movies/${this.id}`
    ).then(res => res.json())
  },
  data () {
    return {
      id: this.$route.params.id,
      movie: []
    }
  }
}
</script>

<style scoped>

</style>
