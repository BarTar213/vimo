import { mapListFromBackend } from '@/lib/API/comments/mapping'
import Vue from 'vue'

export const state = () => ({
  likedComments: Object.create(null)
})

export const getters = {
  checkLikedComment: state => (movieId, commentId) => {
    if (!state.likedComments[movieId]) {
      return false
    }
    return (state.likedComments[movieId]).includes(commentId)
  }
}

export const mutations = {
  updateLikedComments: (state, payload) => {
    if (state.likedComments[payload.movieId]) {
      state.likedComments[payload.movieId] = payload.data
    }
    Vue.set(state.likedComments, payload.movieId, payload.data)
  },
  addToLikedComments: (state, movieId, data) => {
    if (!state.likedComments[movieId]) {
      Vue.set(state.likedComments, movieId, [data])
      return
    }
    state.likedComments[movieId].push(data)
  }
}

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
  },

  async getLikedCommentsListBackend ({ commit, state }, movieId) {
    const data = await this.$backend.comments.getLikedComments(movieId)
    commit('updateLikedComments', { movieId, data })
  }
}
