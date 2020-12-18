<template>
  <div class="ma-2">
    <v-snackbar
      v-model="show"
      :color="color"
      top
    >
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="black"
          icon
          v-bind="attrs"
          @click="show = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>

export default {
  name: 'Snackbar',
  data () {
    return {
      show: false,
      message: '',
      color: ''
    }
  },
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'showMessage') {
        this.message = state.content
        this.color = state.color
        this.show = true
      }
    })
  }
}
</script>

<style scoped>

</style>
