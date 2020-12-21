<template>
  <v-list three-line>
    <template v-for="(comment, index) in comments">
      <v-divider
        :key="index"
        :inset="true"
      />
      <v-list-item
        :key="comment.id"
      >
        <Comment :comment="comment" />
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
import { mapActions } from 'vuex'
import Comment from '@/components/Comment'

export default {
  name: 'CommentList',
  components: { Comment },
  props: {
    movieId: {
      type: Number,
      default: 0
    }
  },
  async fetch () {
    this.comments = await this.getCommentListBackend(this.movieId)
  },
  data () {
    return {
      comments: []
    }
  },
  methods: {
    ...mapActions('comments', ['getCommentListBackend']),
    getInitials (name) {
      const initials = name.match(/\b\w/g) || []
      return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
    }
  }
}
</script>

<style scoped>

</style>
