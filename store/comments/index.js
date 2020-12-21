import { mapListFromBackend } from '@/lib/API/comments/mapping'

export const actions = {
  async getCommentListBackend ({ commit, state }, movieId) {
    const comments = await this.$backend.comments.getComments(movieId)
    mapListFromBackend(comments)
    return comments
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
