<template>
  <v-app light>
    <Navigation />
    <AppBar />
    <Snackbar />
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
import Snackbar from '~/components/Snackbar'

export default {
  components: {
    AppBar,
    Navigation,
    Snackbar
  },
  data () {
    return {
      fixed: false
    }
  }
}
</script>
