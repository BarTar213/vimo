import { backendAddresses } from '@/lib/API/helpers/backend-address'

export default (axios, store) => ({
  addUser: async (user) => {
    return await axios.$post(
      `${backendAddresses.userSvc}/users`,
      { user }
    )
  },
  getCurrentUser: async () => {
    return await axios.$get(
      `${backendAddresses.userSvc}/current`
    )
  },
  loginUser: async (user) => {
    return await axios.$post(
      `${backendAddresses.userSvc}/auth/login`,
      {
        login: user.login,
        password: user.password
      }
    )
  },
  verifyLogin: async (login, code) => {
    // ${store.getters['auth/getCurrentUser'].login}
    return await axios.$patch(
      `${backendAddresses.userSvc}/${login}/verify`,
      {},
      {
        params: {
          code
        }
      }
    )
  }
})
