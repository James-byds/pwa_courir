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
    <span class="user-login__label">Logged in as: {{ currentUser.login }}</span>
    <button @click="UserStore.logout()" class="button is-danger">Log Out</button>
  </section>
  <section class="user-login" v-else>
    <span class="user-login__label">Please log in to access more features.</span>
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
    <button
      class="button is-primary user-login__input"
      @click.prevent="UserStore.authenticate(login, password)"
    >
      Log In
    </button>
  </section>
</template>

<style lang="scss" scoped>
.user-login {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  &__label {
    display: block;
    color: var(--color-text);
    width: 100%;
    flex: 1;
  }
  &__input {
    display: block;
    max-width: 200px;
  }
}
</style>
