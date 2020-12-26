<template>
  <div>
    <v-dialog v-model="overlay" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>
            mdi-plus-circle
          </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Comment</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="content"
                  autofocus
                  label="Content"
                  placeholder="Share your feelings!"
                  outlined
                  required
                  counter="50"
                  :error-messages="contentErrors"
                  @blur="$v.content.$touch()"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="cancel">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'CommentInput',
  mixins: [validationMixin],
  props: {
    movieId: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data () {
    return {
      overlay: false,
      content: '',
      valid: false
    }
  },
  validations: {
    content: { required, maxLength: maxLength(50), minLength: minLength(1) }
  },
  computed: {
    ...mapState('auth', ['user']),
    contentErrors () {
      const errors = []
      if (!this.$v.content.$dirty) { return errors }
      !this.$v.content.maxLength && errors.push('Content must be at most 50 characters long')
      !this.$v.content.required && errors.push('Content is required.')
      return errors
    }
  },
  methods: {
    ...mapActions('comments', ['addCommentBackend']),
    ...mapMutations('auth', ['updateAuthDialog']),
    save () {
      if (this.user == null) {
        this.updateAuthDialog(true)
        return
      }

      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      this.addCommentBackend({
        content: this.content,
        movieId: this.movieId
      }).then(() => {
        this.content = ''
        this.overlay = false
        this.refreshParent()
      })
      this.$v.$reset()
    },
    cancel () {
      this.$v.$reset()
      this.content = ''
      this.overlay = false
    },
    refreshParent () {
      this.$emit('refresh')
    }
  }
}
</script>

<style scoped>

</style>
