<template>
  <v-app light>
    <!--    <Navigation />-->
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
      <div style="margin-left: auto">
        <v-icon style="margin-right: 8px">
          mdi-facebook
        </v-icon>
        <v-icon style="margin-right: 8px">
          mdi-instagram
        </v-icon>
        <v-icon style="margin-right: 8px">
          mdi-youtube
        </v-icon>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import AuthDialog from '@/components/auth/AuthDialog'
import AppBar from '~/components/AppBar'
import Snackbar from '~/components/Snackbar'

export default {
  components: {
    AuthDialog,
    AppBar,
    Snackbar
  },
  data () {
    return {
      fixed: false
    }
  }
}
</script>
