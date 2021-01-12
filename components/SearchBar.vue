<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    cache-items
    no-data-text="Nothing found"
    hide-selected
    hide-details
    item-text="title"
    placeholder="Search movies"
    prepend-inner-icon="mdi-magnify"
    return-object
    filled
    rounded
    dense
    @change="itemChange"
  >
    <template v-slot:item="{ item }">
      <v-card rounded style="margin-right: 10px; margin-bottom: 10px">
        <v-img :src="item.poster_path" max-width="88" />
      </v-card>
      <v-list-item-content>
        <v-list-item-title v-text="item.title" />
        <v-list-item-subtitle v-text="item.release_date" />
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapActions } from 'vuex'
import { mapListFromBackend } from '@/lib/API/movies/mapping'

export default {
  name: 'SearchBar',
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null,
    searchRes: new Map()
  }),

  computed: {
    items () {
      return this.entries
    }
  },

  watch: {
    search (val) {
      if (this.searchRes[val]) {
        return this.searchRes[val]
      }

      // At least one character
      if (val === null || val.length < 1) { return }

      // Items have already been requested
      if (this.isLoading) { return }

      this.isLoading = true

      // Lazily load input items
      this.searchMoviesBackend(val)
        .then((response) => {
          mapListFromBackend(response)
          this.entries = response
          this.searchRes[val] = response
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
    model () {
      if (!this.model) {
        return
      }
      const id = this.model.id
      this.$router.push(`/movie/${id}`)
    }
  },
  methods: {
    ...mapActions('movies', ['searchMoviesBackend']),
    itemChange () {
      this.$nextTick(() => {
        this.model = null
      })
    }
  }
}
</script>

<style scoped>

</style>
