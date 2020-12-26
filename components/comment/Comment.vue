<template>
  <v-row class="v-comment">
    <v-col cols="10" class="v-comment-inner">
      <v-avatar color="red" class="v-comment-avatar">
        {{ comment.user_id }}
      </v-avatar>
      <v-row class="v-comment-content" justify="start" no-gutters>
        <v-col cols="12" align-self="start">
          <div class="v-comment-content-author">
            <span class="v-comment-content-author-name">{{ comment.user_id }}</span>
            <span class="v-comment-content-author-time">{{ comment.create_date }}</span>
          </div>
          <div class="v-comment-content-detail">
            {{ comment.content }}
          </div>
          <CommentToolbar :liked="liked" :disliked="disliked" :likes="comment.likes" @like="like" @dislike="dislike" />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="2" align-self="center">
      <v-row>
        <CommentUpdateInput :comment-id="comment.id" :before-content="comment.content" @refresh="refreshParent" />
        <v-btn icon @click="deleteComment">
          <v-icon color="red">
            mdi-trash-can-outline
          </v-icon>
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import CommentToolbar from '@/components/comment/CommentToolbar'
import CommentUpdateInput from '@/components/comment/CommentUpdateInput'

export default {
  name: 'Comment',
  components: {
    CommentUpdateInput,
    CommentToolbar
  },
  props: {
    comment: {
      type: Object,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      liked: false,
      disliked: false
    }
  },
  computed: {
    ...mapGetters('comments', ['checkLikedComment']),
    ...mapState('auth', ['user'])
  },
  mounted () {
    if (this.user == null) {
      return
    }
    this.liked = this.checkLikedComment(this.comment.movie_id, this.comment.id)
  },
  methods: {
    ...mapActions('comments', ['likeCommentBackend', 'deleteCommentBackend', 'getLikedCommentsListBackend']),
    like () {
      if (this.disliked) {
        this.disliked = false
      }

      this.likeCommentBackend({
        id: this.comment.id,
        beforeVal: this.liked
      }).then(() => {
        this.liked = !this.liked
        if (this.liked) {
          this.comment.likes++
        } else {
          this.comment.likes--
        }
        this.getLikedCommentsListBackend(this.comment.movie_id)
      })
    },
    dislike () {
      if (this.liked) {
        this.like()
      }
      this.disliked = !this.disliked
    },
    deleteComment () {
      this.deleteCommentBackend(this.comment.id).then(() => {
        this.$emit('refresh')
      })
    },
    refreshParent () {
      this.$emit('refresh')
    }
  }
}
</script>

<style scoped>

.v-comment {
}

.v-comment-inner {
  display: flex;
  padding-bottom: 16px;
  padding-top: 16px;
}

.v-comment-avatar {
  position: relative;
  flex-shrink: 0;
  margin-right: 14px;
  cursor: pointer;
}

.v-comment-avatar img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.v-comment-content {
  position: relative;
  flex: 1 1 auto;
  min-width: 1px;
  font-size: 14px;
  word-wrap: break-word;
}

.v-comment-content-author {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 4px;
  font-size: 14px;
}

.v-comment-content-author > a,
.v-comment-content-author > span {
  padding-right: 8px;
  font-size: 14px;
  line-height: 18px;
}

.v-comment-content-author-name {
  color: gray;
  font-size: 14px;
  transition: color 0.3s;
}

.v-comment-content-author-name > * {
  color: rgba(0, 0, 0, 0.45);
}

.v-comment-content-author-name > *:hover {
  color: rgba(0, 0, 0, 0.45);
}

.v-comment-content-author-time {
  color: #ccc;
  white-space: nowrap;
  cursor: auto;
}

.v-comment-content-detail p {
  white-space: pre-wrap;
}

.v-comment-actions {
  margin-top: 12px;
  margin-right: 2px;
  padding-left: 0;
}

.v-comment-actions > li {
  display: inline-block;
  color: grey;
}

.v-comment-actions > li > span {
  padding-right: 10px;
  color: grey;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s;
  user-select: none;
}

.v-comment-actions > li > span:hover {
  color: rgba(0, 0, 0, 0.45);
}

.v-comment-user-action {
  float: right;
}

</style>
