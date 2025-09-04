<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/users'
const UserStore = useUserStore()

const login = ref('')
const password = ref('')
const firstname = ref('')
const lastname = ref('')

const newUser = ref({
  data: {
    login: login,
    password: password,
    firstname: firstname,
    lastname: lastname,
  },
})
</script>

<template>
  <div class="register-user">
    <h2>Register User</h2>
    <form @submit.prevent="registerUser">
      <input class="input" required type="text" v-model.lazy.trim="login" placeholder="Login" />
      <input
        class="input"
        required
        type="password"
        v-model.lazy.trim="password"
        placeholder="Password"
      />
      <input
        class="input"
        required
        type="firstname"
        v-model.lazy.trim="firstname"
        placeholder="First Name"
      />
      <input
        class="input"
        required
        type="lastname"
        v-model.lazy.trim="lastname"
        placeholder="Last Name"
      />
      <button type="submit" class="button is-info" @click.prevent="UserStore.addUser(newUser)">
        Register
      </button>
    </form>
  </div>
</template>
