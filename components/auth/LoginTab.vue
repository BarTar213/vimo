<template>
  <v-card class="px-4">
    <v-card-text>
      <v-form ref="loginForm" v-model="$v.login.$valid">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="login.login"
              autofocus
              label="Login"
              color="cyan lighten-3"
              :error-messages="loginErrors"
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
import { mapActions, mapMutations } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'LoginTab',
  mixins: [validationMixin],
  data () {
    return {
      login: {
        login: '',
        password: ''
      },
      showPassword: false
    }
  },
  validations: {
    login: {
      login: {
        required,
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
    loginErrors () {
      const errors = []
      if (!this.$v.login.$dirty) { return errors }

      !this.$v.login.login.required && errors.push('Login is required')
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
    ...mapActions('auth', ['loginUserBackend']),
    cancel () {
      this.$v.$reset()
      this.updateDialog(false)
      this.resetLogin()
    },
    save () {
      this.$v.login.$touch()
      if (this.$v.login.$invalid) {
        return
      }
      this.loginUserBackend({ login: this.login.login, password: this.login.password })
      this.updateDialog(false)
      this.$v.$reset()
      this.resetLogin()
    },
    resetLogin () {
      this.login = {
        login: '',
        password: ''
      }
      this.showPassword = false
    }
  }
}
</script>

<style scoped>

</style>
