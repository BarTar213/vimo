<template>
  <v-app-bar
    :clipped-left="clipped"
    fixed
    app
  >
    <v-app-bar-nav-icon @click.stop="updateDrawer" />
    <v-btn
      icon
      @click.stop="miniVariant = !miniVariant"
    >
      <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
    </v-btn>
    <v-btn
      icon
      @click.stop="clipped = !clipped"
    >
      <v-icon>mdi-application</v-icon>
    </v-btn>
    <v-btn
      icon
      @click.stop="fixed = !fixed"
    >
      <v-icon>mdi-minus</v-icon>
    </v-btn>
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <SearchBar />
    <v-spacer />
    <Notification />
    <Account />
  </v-app-bar>
</template>

<script>
import Account from '@/components/account/Account'
import Notification from '@/components/notification/Notification'
import SearchBar from '~/components/SearchBar'

export default {
  name: 'AppBar',
  components: { Notification, Account, SearchBar },
  data () {
    return {
      clipped: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Movies',
          to: '/movies'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'ViMo'
    }
  },
  methods: {
    updateDrawer () {
      this.$store.commit('updateDrawer')
    }
  }
}
</script>

<style scoped>

</style>
