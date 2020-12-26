<template>
  <div>
    <v-menu bottom :offset-y="true">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="getCurrentUser().login"
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-avatar color="cyan lighten-3">
            <h3>{{ loginInitials }}</h3>
          </v-avatar>
        </v-btn>
        <v-btn
          v-else
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-avatar color="cyan lighten-3">
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
        </v-btn>
      </template>

      <v-list v-if="getCurrentUser().login">
        <v-list-item
          v-for="(item, index) in loggedItems"
          :key="index"
          :to="item.to"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item
          v-for="(item, index) in notLoggedItems"
          :key="index"
          @click="login"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Account',
  data: () => ({
    loggedItems: [
      { title: 'Liked', to: '/liked' }
    ],
    notLoggedItems: [
      {
        title: 'login'
      }
    ]
  }),
  computed: {
    ...mapGetters('auth', ['getCurrentUser']),
    user () {
      return this.getCurrentUser()
    },
    loginInitials () {
      const initials = this.getCurrentUser().login.match(/\b\w/g) || []
      return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
    }
  },
  methods: {
    ...mapMutations('auth', ['updateDialog']),
    login () {
      this.updateDialog(true)
    }
  }
}
</script>

<style scoped>

</style>
