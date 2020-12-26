<template>
  <v-card class="px-4">
    <v-card-text>
      <v-form ref="registerForm" v-model="$v.registration.$valid">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="registration.name"
              autofocus
              label="Name"
              maxlength="24"
              color="cyan lighten-3"
              :error-messages="nameErrors"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="registration.login"
              label="Login"
              color="cyan lighten-3"
              :error-messages="loginErrors"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="registration.email"
              label="E-mail"
              color="cyan lighten-3"
              :error-messages="emailErrors"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="registration.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              hint="At least 8 characters"
              counter
              color="cyan lighten-3"
              :error-messages="passwordErrors"
              @click:append="showPassword = !showPassword"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="registration.verifyPassword"
              block
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              label="Confirm Password"
              counter
              color="cyan lighten-3"
              :error-messages="verifyPasswordErrors"
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
      <v-btn color="blue darken-1" text @click="register">
        Register
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'RegisterTab',
  mixins: [validationMixin],
  data () {
    return {
      registration: {
        name: '',
        email: '',
        login: '',
        password: '',
        verifyPassword: ''
      },
      showPassword: false
    }
  },
  validations: {
    registration: {
      name: {
        required,
        maxLength: maxLength(30),
        minLength: minLength(1)
      },
      email: {
        required,
        email
      },
      login: {
        required,
        maxLength: maxLength(20),
        minLength: minLength(1)
      },
      password: {
        required,
        minLength: minLength(8)
      },
      verifyPassword: {
        sameAsPassword: sameAs('password')
      }
    }
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.registration.$dirty) { return errors }

      !this.$v.registration.name.required && errors.push('Name is required')
      !this.$v.registration.name.maxLength && errors.push('Maximum 30 characters')
      !this.$v.registration.name.minLength && errors.push('At least 1 character')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.registration.$dirty) { return errors }

      !this.$v.registration.email.required && errors.push('Email is required')
      !this.$v.registration.email.email && errors.push('Invalid e-mail')
      return errors
    },
    loginErrors () {
      const errors = []
      if (!this.$v.registration.$dirty) { return errors }

      !this.$v.registration.login.required && errors.push('Login is required')
      !this.$v.registration.login.maxLength && errors.push('Maximum 30 characters')
      !this.$v.registration.login.minLength && errors.push('At least 1 character')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.registration.$dirty) { return errors }

      !this.$v.registration.password.required && errors.push('Password is required')
      !this.$v.registration.password.minLength && errors.push('At least 8 character')
      return errors
    },
    verifyPasswordErrors () {
      const errors = []
      if (!this.$v.registration.$dirty) { return errors }

      !this.$v.registration.verifyPassword.sameAsPassword && errors.push('Confirmation password should be same as password')
      return errors
    }
  },
  methods: {
    ...mapMutations('auth', ['updateDialog']),
    ...mapActions('auth', ['addUserBackend']),
    cancel () {
      this.$v.$reset()
      this.updateDialog(false)
      this.resetRegistration()
      // this.content = ''
      // this.overlay = false
    },
    register () {
      this.$v.registration.$touch()
      if (this.$v.registration.$invalid) {
        return
      }

      this.addUserBackend({
        name: this.registration.name,
        email: this.registration.email,
        login: this.registration.login,
        password: this.registration.password
      })
      this.updateDialog(false)
      this.resetRegistration()
      this.$v.$reset()
    },
    resetRegistration () {
      this.registration = {
        name: '',
        email: '',
        login: '',
        password: '',
        verifyPassword: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
