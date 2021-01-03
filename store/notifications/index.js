import { mapListFromBackend } from '@/lib/API/notifications/mapping'

export const actions = {
  async getNotificationListBackend () {
    const notifications = await this.$backend.notifications.listNotifications()
    mapListFromBackend(notifications)
    return notifications
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
