export const actions = {
  async getNotificationListBackend () {
    return await this.$backend.notifications.listNotifications()
  },

  async getNotificationBackend ({ commit, state }, id) {
    return await this.$backend.notifications.getNotification(id)
  },

  async readNotificationBackend ({ commit, state }, { id, read }) {
    return await this.$backend.notifications.readNotification(id, read)
  },

  async deleteNotificationBackend ({ commit, state }, id) {
    return await this.$backend.notifications.deleteNotification(id)
  }
}
