<template>
  <v-app light>
    <Navigation />
    <AppBar />
    <Snackbar />
    <v-main>
      <v-container>
        <AuthDialog />
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
import AuthDialog from '@/components/auth/AuthDialog'
import Navigation from '~/components/Navigation'
import AppBar from '~/components/AppBar'
import Snackbar from '~/components/Snackbar'

export default {
  components: {
    AuthDialog,
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
