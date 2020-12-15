<template>
  <v-app light>
    <Navigation />
    <AppBar />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navigation from '~/components/Navigation'
import AppBar from '~/components/AppBar'

export default {
  components: {
    AppBar,
    Navigation
  },
  data () {
    return {
      fixed: false
    }
  }
}
</script>
