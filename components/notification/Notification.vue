<template>
  <v-btn icon>
    <v-badge color="red" :content="unreadNotificationLength" overlap :dot="unreadNotificationLength===0">
      <v-icon>mdi-bell</v-icon>
    </v-badge>
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Notification',
  async fetch () {
    this.notifications = await this.getNotificationListBackend()
  },
  data () {
    return {
      notifications: []
    }
  },
  computed: {
    unreadNotificationLength () {
      return this.notifications.filter(item => item.read === false).length
    }
  },
  methods: {
    ...mapActions('notifications', ['getNotificationListBackend'])
  }
}
</script>

<style scoped>

</style>
