import { mapEntityFromBackend } from '@/lib/API/credits/mapping'

export const actions = {
  async getFromBackend ({ commit, state }, movieId) {
    const credits = await this.$backend.credits.getCredits(movieId)
    return mapEntityFromBackend(credits)
  }
}
