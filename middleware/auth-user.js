import { backendAddresses } from '@/lib/API/helpers/backend-address'

export default async function ({ store, $axios }) {
  const user = await $axios.$get(`${backendAddresses.userSvc}/current`)
  store.commit('auth/updateUser', user)
}
