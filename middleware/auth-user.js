import { backendAddresses } from '@/lib/API/helpers/backend-address'

export default async function ({ store, $axios }) {
  await $axios.$get(`${backendAddresses.userSvc}/current`).then((res) => {
    store.commit('auth/updateUser', res)
    // eslint-disable-next-line handle-callback-err
  }).catch((err) => {})
}
