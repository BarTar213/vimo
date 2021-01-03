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
        @click="readNotification(item.id, index)"
      >
        <v-list-item-subtitle :style="(item.read)?'':'font-weight: bolder;'" @click="readNotification(item.id, index)">
          {{ item.message }}
        </v-list-item-subtitle>
        <v-list-item-action>
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
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Notification',
  async fetch () {
    if (this.user == null) {
      return
    }
    this.notifications = await this.getNotificationListBackend()
  },
  data () {
    return {
      notifications: []
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    unreadNotificationLength () {
      return this.notifications.filter(item => item.read === false).length
    }
  },
  methods: {
    ...mapActions('notifications', ['getNotificationListBackend', 'deleteNotificationBackend', 'readNotificationBackend']),
    deleteNotification (id, index) {
      this.deleteNotificationBackend(id)
      this.notifications.splice(index, 1)
    },
    readNotification (id, index) {
      this.readNotificationBackend({ id, read: true })
      this.notifications[index].read = true
    }
  }
}
</script>

<style scoped>

</style>
