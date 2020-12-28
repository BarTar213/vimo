import { backendAddresses } from '@/lib/API/helpers/backend-address'

export default async function ({
  store,
  $http
}) {
  try {
    const user = await $http.$get(`${backendAddresses.userSvc}/current`)
    store.commit('auth/updateUser', user)
  } catch (err) {

  }
}
