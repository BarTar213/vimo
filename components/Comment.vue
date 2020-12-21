<template>
  <div class="v-comment">
    <div class="v-comment-inner">
      <v-avatar color="red" class="v-comment-avatar">
        {{ comment.user_id }}
      </v-avatar>
      <v-row class="v-comment-content" justify="start" no-gutters>
        <v-col cols="12" align-self="start">
          <div class="v-comment-content-author">
            <span class="v-comment-content-author-name">{{ comment.user_id }}</span><span
              class="v-comment-content-author-time"
            >{{ comment.create_date }}</span>
          </div>
          <div class="v-comment-content-detail">
            {{ comment.content }}
          </div>
          <CommentToolbar :liked="liked" :disliked="disliked" :likes="comment.likes" @like="like" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CommentToolbar from '@/components/CommentToolbar'

export default {
  name: 'Comment',
  components: { CommentToolbar },
  props: {
    comment: {
      type: Object,
      default () {
        return []
      }
    },
    liked: {
      type: Boolean,
      default: false
    },
    disliked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions('comments', ['likeCommentBackend']),
    like () {
      this.likeCommentBackend({
        id: this.comment.id,
        beforeVal: this.liked
      })
        .then(() => {
          this.liked = !(this.liked)
        })
    }
  }
}
</script>

<style lang="less" scoped>

.v-comment {
  position: relative;

  &-inner {
    display: flex;
    padding-bottom: 16px;
    padding-top: 16px;
  }
;

  &-avatar {
    position: relative;
    flex-shrink: 0;
    margin-right: 14px;
    cursor: pointer;

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
  }

  &-content {
    position: relative;
    flex: 1 1 auto;
    min-width: 1px;
    font-size: 14px;
    word-wrap: break-word;

    &-author {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin-bottom: 4px;
      font-size: 14px;

      & > a,
      & > span {
        padding-right: 8px;
        font-size: 14px;
        line-height: 18px;
      }

      &-name {
        color: gray;
        font-size: 14px;
        transition: color 0.3s;

        > * {
          color: rgba(0, 0, 0, .45);

          &:hover {
            color: rgba(0, 0, 0, .45);
          }
        }
      }

      &-time {
        color: #ccc;
        white-space: nowrap;
        cursor: auto;
      }
    }

    &-detail p {
      white-space: pre-wrap;
    }
  }

  &-actions {
    margin-top: 12px;
    padding-left: 0;

    > li {
      display: inline-block;
      color: grey;

      > span {
        padding-right: 10px;
        color: grey;
        font-size: 14px;
        cursor: pointer;
        transition: color 0.3s;
        user-select: none;

        &:hover {
          color: rgba(0, 0, 0, .45);
        }
      }
    }
  }
}

</style>
