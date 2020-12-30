<template>
  <v-row align-content="center">
    <v-col cols="4">
      <p>
        <strong>Original Title</strong>
        <br>{{ movie.original_title }}
      </p>
      <p>
        <strong>Original Language</strong>
        <br>{{ movie.original_language }}
      </p>
    </v-col>
    <v-col cols="4">
      <p>
        <strong>Budget</strong>
        <br>{{ (movie.budget.length>2)?movie.budget:'-' }}
      </p>
      <p>
        <strong>Revenue</strong>
        <br>{{ (movie.revenue.length>2)?movie.revenue:'-' }}
      </p>
    </v-col>
    <v-col cols="4">
      <p>
        <strong>Production companies</strong>
        <br>{{ movie.production_companies.join(", ") }}
      </p>
      <p>
        <strong>Production countries</strong>
        <br>{{ movie.production_countries. join(", ") }}
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'MovieInfo',
  props: {
    movie: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
</style>
