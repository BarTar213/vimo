<template>
  <v-app-bar
    :clipped-left="clipped"
    fixed
    color="#e9fafc"
    app
  >
    <!--    <v-app-bar-nav-icon @click.stop="updateDrawer" />-->
    <!--    <v-btn-->
    <!--      icon-->
    <!--      @click.stop="miniVariant = !miniVariant"-->
    <!--    >-->
    <!--      <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>-->
    <!--    </v-btn>-->
    <!--    <v-btn-->
    <!--      icon-->
    <!--      @click.stop="clipped = !clipped"-->
    <!--    >-->
    <!--      <v-icon>mdi-application</v-icon>-->
    <!--    </v-btn>-->
    <!--    <v-btn-->
    <!--      icon-->
    <!--      @click.stop="fixed = !fixed"-->
    <!--    >-->
    <!--      <v-icon>mdi-minus</v-icon>-->
    <!--    </v-btn>-->
    <v-toolbar-title v-text="title" />
    <v-tabs
      align-with-title
      class="ml-n9"
      color="cyan darken-1"
      style="max-width: 60%"
    >
      <v-tab
        v-for="link in items"
        :key="link.title"
        :to="link.to"
      >
        {{ link.title }}
      </v-tab>
    </v-tabs>

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
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-movie',
          title: 'Movies',
          to: '/movies'
        },
        {
          icon: 'mdi-trophy',
          title: 'Ranking',
          to: '/ranking'
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
