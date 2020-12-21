export const actions = {
  async getCommentListBackend ({ commit, state }, movieId) {
    return await this.$backend.comments.getComments(movieId)
  },

  async addCommentBackend ({ commit }, { comment, movieId }) {
    return await this.$backend.comments.addComment(comment, movieId)
  },

  async updateCommentBackend ({ commit }, { id, comment }) {
    return (await this.$backend.comments.updateComment(id, comment))
  },

  async deleteCommentBackend ({ commit }, id) {
    return (await this.$backend.comments.deleteComment(id))
  },

  async likeCommentBackend ({ commit }, { id, beforeVal }) {
    return (await this.$backend.comments.likeComment(id, beforeVal))
  }
}
