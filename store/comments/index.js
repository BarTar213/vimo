import { mapListFromBackend } from '@/lib/API/comments/mapping'

export const actions = {
  async getCommentListBackend ({ commit, state }, movieId) {
    const comments = await this.$backend.comments.getComments(movieId)
    mapListFromBackend(comments)
    return comments
  },

  async addCommentBackend ({ commit }, { content, movieId }) {
    return await this.$backend.comments.addComment(content, movieId)
  },

  async updateCommentBackend ({ commit }, { id, content }) {
    return (await this.$backend.comments.updateComment(id, content))
  },

  async deleteCommentBackend ({ commit }, id) {
    return (await this.$backend.comments.deleteComment(id))
  },

  async likeCommentBackend ({ commit }, { id, beforeVal }) {
    return (await this.$backend.comments.likeComment(id, beforeVal))
  }
}
