<template>
  <v-card class="px-4">
    <v-card-text>
      <v-form ref="loginForm" v-model="$v.login.$valid">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="login.email"
              autofocus
              label="E-mail"
              color="cyan lighten-3"
              :error-messages="emailErrors"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="login.password"
              :append-icon="showPassword ? 'eye':'eye-off'"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              color="cyan lighten-3"
              :error-messages="passwordErrors"
              @click:append="showPassword = !showPassword"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="red darken-1" text @click="cancel">
        Cancel
      </v-btn>
      <v-btn color="blue darken-1" text @click="save">
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'LoginTab',
  mixins: [validationMixin],
  data () {
    return {
      login: {
        email: '',
        password: ''
      },
      showPassword: false
    }
  },
  validations: {
    login: {
      email: {
        required,
        email,
        maxLength: maxLength(20),
        minLength: minLength(1)
      },
      password: {
        required,
        maxLength: maxLength(20),
        minLength: minLength(1)
      }
    }
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.login.$dirty) { return errors }

      !this.$v.login.email.required && errors.push('Email is required')
      !this.$v.login.email.email && errors.push('Invalid e-mail')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.login.$dirty) { return errors }

      !this.$v.login.password.required && errors.push('Password is required')
      return errors
    }
  },
  methods: {
    ...mapMutations('auth', ['updateDialog']),
    cancel () {
      this.$v.$reset()
      this.updateDialog(false)
      this.resetLogin()
      // this.content = ''
      // this.overlay = false
    },
    save () {
      this.$v.login.$touch()
      if (this.$v.login.$invalid) {
        return
      }
      console.log('logged')
      this.updateDialog(false)
      this.$v.$reset()
      this.resetLogin()
    },
    resetLogin () {
      this.login = {
        email: '',
        password: ''
      }
      this.showPassword = false
    }
  }
}
</script>

<style scoped>

</style>
