<template>
  <v-list three-line>
    <template v-for="(comment, index) in comments">
      <v-divider
        v-if="comment.divider"
        :key="index"
        :inset="comment.inset"
      />

      <v-list-item
        v-else
        :key="comment.title"
      >
        <v-list-item-avatar>
          {{ getInitials(comment.name) }}
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-html="comment.title" />
          <v-list-item-subtitle v-html="comment.subtitle" />
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'CommentList',
  props: {
    comments: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    getInitials (name) {
      const initials = name.match(/\b\w/g) || []
      return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
    }
  }
}
</script>

<style scoped>

</style>
