<template>
  <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
    <v-card color="cyan lighten-3" dark>
      <v-card-title v-if="dialogTitle" class="justify-center">
        This action requires authentication
      </v-card-title>
      <v-tabs
        v-model="tab"
        show-arrows
        background-color="cyan lighten-3"
        icons-and-text
        dark
        grow
      >
        <v-tabs-slider color="cyan darken-3" />
        <v-tab v-for="i in tabs" :key="i.name">
          <v-icon large>
            {{ i.icon }}
          </v-icon>
          <div class="caption py-1">
            {{ i.name }}
          </div>
        </v-tab>
        <v-tab-item>
          <LoginTab />
        </v-tab-item>
        <v-tab-item>
          <RegisterTab />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import LoginTab from '@/components/auth/LoginTab'
import RegisterTab from '@/components/auth/RegisterTab'

export default {
  name: 'AuthDialog',
  components: { RegisterTab, LoginTab },
  data: () => ({
    tab: 0,
    tabs: [
      {
        name: 'Login',
        icon: 'mdi-account'
      },
      {
        name: 'Register',
        icon: 'mdi-account-outline'
      }
    ]
  }),
  computed: {
    ...mapState('auth', ['dialog', 'dialogTitle'])
  },
  methods: {
    ...mapMutations('auth', ['updateDialog'])
  }
}
</script>

<style scoped>

</style>
