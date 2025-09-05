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
    <span class="icon is-small is-left">
      <font-awesome-icon :icon="['fas', 'person-running']" />
    </span>
    <span class="user-login__label">Logged in as: {{ currentUser.login }}</span>
    <button @click="UserStore.logout()" class="button is-danger">
      Log Out <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
    </button>
  </section>
  <section class="user-login" v-else>
    <div class="user-login__icons">
      <span class="icon is-small is-left">
        <font-awesome-icon :icon="['fas', 'user']" />
      </span>
      <span class="icon is-small is-left">
        <font-awesome-icon :icon="['fas', 'unlock']" />
      </span>
    </div>
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
      <font-awesome-icon :icon="['fas', 'sign-in-alt']" /> Log In
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
  &__icons {
    align-self: stretch;
    display: flex;
    align-items:flex-end;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    flex-direction: column;
    margin-block-start: 1.2rem;
  }
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
