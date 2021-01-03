<template>
  <v-menu bottom :offset-y="true">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-badge color="red" :content="unreadNotificationLength" overlap :dot="unreadNotificationLength===0">
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(item, index) in notifications"
        :key="item.id"
        :to="item.to"
      >
        <v-list-item-subtitle> {{ item.message }}</v-list-item-subtitle>
        <v-list-item-action @click="deleteNotification(item.id, index)">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" @click="deleteNotification(item.id, index)" v-on="on">
                <v-icon color="red">
                  mdi-window-close
                </v-icon>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-menu>
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
    ...mapActions('notifications', ['getNotificationListBackend', 'deleteNotificationBackend']),
    deleteNotification (id, index) {
      this.deleteNotificationBackend(id)
      this.notifications.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
