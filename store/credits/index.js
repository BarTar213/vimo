export const actions = {
  async getFromBackend ({ commit, state }, movieId) {
    return await this.$backend.credits.getCredits(movieId)
  }
}
