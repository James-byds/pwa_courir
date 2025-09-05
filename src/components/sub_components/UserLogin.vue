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
    <span class="icon is-small is-left">
      <font-awesome-icon :icon="['fas', 'user']" />
    </span>
    <span class="icon is-small is-left">
      <font-awesome-icon :icon="['fas', 'unlock']" />
    </span>
    <fieldset class="user-login__label">
      Log In
      <input
        type="text"
        placeholder="Login"
        name="login"
        class="input user-login__input"
        v-model.lazy.trim="login"
        required
      />
      <input
        type="password"
        placeholder="Password"
        class="input user-login__input"
        v-model.lazy.trim="password"
        required
      />
    </fieldset>
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
  align-items: self-end;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1.5rem;
  border-inline-start: 2px solid var(--border-color);
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
