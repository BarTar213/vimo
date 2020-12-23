<template>
  <div>
    <v-row justify="start" align="start">
      <h2>Comments</h2>
      <CommentInput :movie-id="movieId" @refresh="refreshCommentList" />
    </v-row>
    <v-list three-line>
      <template v-for="(comment, index) in comments">
        <v-divider
          :key="index"
          :inset="true"
        />
        <v-list-item
          :key="comment.id"
        >
          <Comment :comment="comment" @refresh="refreshCommentList" />
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Comment from '@/components/comment/Comment'
import CommentInput from '@/components/comment/CommentInput'

export default {
  name: 'CommentList',
  components: {
    CommentInput,
    Comment
  },
  props: {
    movieId: {
      type: Number,
      default: 0
    }
  },
  async fetch () {
    this.comments = await this.getCommentListBackend(this.movieId)
    await this.getLikedCommentsListBackend(this.movieId)
  },
  data () {
    return {
      comments: [],
      commentOverlay: false,
      likedComments: []
    }
  },
  methods: {
    ...mapActions('comments', ['getCommentListBackend', 'getLikedCommentsListBackend']),
    getInitials (name) {
      const initials = name.match(/\b\w/g) || []
      return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
    },
    async refreshCommentList () {
      this.comments = await this.getCommentListBackend(this.movieId)
    }
  }
}
</script>

<style scoped>
</style>
