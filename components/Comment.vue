<template>
  <div class="v-comment">
    <div class="v-comment-inner">
      <div class="v-comment-avatar">
        <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="comment-avatar">
      </div><div class="v-comment-content">
        <div class="v-comment-content-author">
          <span class="v-comment-content-author-name">Han Solo</span><span class="v-comment-content-author-time">a few seconds ago</span>
        </div><div class="v-comment-content-detail">
          gfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdggfdgdg
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment'
}
</script>

<style lang="less" scoped>
/*.v-comment{*/
/*  display: flex;*/
/*  padding-top: 16px;*/
/*  padding-bottom: 16px;*/
/*}*/
/*.v-comment-avatar{*/
/*  position: relative;*/
/*  flex-shrink: 0;*/
/*  margin-right: 12px;*/
/*  cursor: pointer;*/
/*}*/
/*.v-comment-content{*/
/*  position: relative;*/
/*  flex: 1 1 auto;*/
/*  min-width: 1px;*/
/*  font-size: 14px;*/
/*}*/

/*.v-comment-content-author{*/
/*  display: flex;*/
/*  flex-wrap: wrap;*/
/*  justify-content: flex-start;*/
/*  margin-bottom: 4px;*/
/*  font-size: 14px;*/
/*}*/

/*.v-comment-content-author {*/
/*  padding-right: 8px;*/
/*  font-size: 12px;*/
/*  line-height: 18px;*/
/*}*/

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
    margin-right: 12px;
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
