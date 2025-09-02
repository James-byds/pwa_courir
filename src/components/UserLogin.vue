<script setup>
import { useUserStore } from '@/stores/users'
import { ref, computed } from 'vue'

const UserStore = useUserStore()
const currentUser = computed(() => UserStore.currentUser)

const login = ref('')
const password = ref('')
</script>

<template>
  <section class="user-login" v-if="currentUser">
    <span class="user-login__label">Logged in as: {{ currentUser }}</span>
    <button @click="UserStore.logout()">Log Out</button>
  </section>
  <section class="user-login" v-else>
    <span class="user-login__label">Please log in.</span>
    <!-- Add login form or button here -->
    <input
      type="text"
      placeholder="Login"
      name="login"
      class="input user-login__input"
      v-model.lazy.trim="login"
    />
    <input
      type="password"
      placeholder="Password"
      class="input user-login__input"
      v-model.lazy.trim="password"
    />
    <button class="button is-primary" @click.prevent="UserStore.authenticate(login, password)">
      Log In
    </button>
  </section>
</template>

<style lang="scss" scoped>
.user-login {
  padding: 2rem;
  &__label {
    display: block;
    margin-bottom: 1rem;
    color: var(--color-text);
  }
}
</style>
