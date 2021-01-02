import { backendAddresses } from '@/lib/API/helpers/backend-address'

export default (axios, store) => ({
  listNotifications: async () => {
    return await axios.$get(
      `${backendAddresses.notificationSvc}/notifications`
    )
  },

  getNotification: async (id) => {
    return await axios.$get(
      `${backendAddresses.notificationSvc}/notifications/${id}`
    )
  },

  readNotification: async (id, read) => {
    return await axios.$patch(
      `${backendAddresses.notificationSvc}/notifications/${id}`,
      {},
      {
        params: { read }
      }
    )
  },

  deleteNotification: async (id) => {
    return await axios.delete(
      `${backendAddresses.notificationSvc}/notifications/${id}`
    )
  }
})
