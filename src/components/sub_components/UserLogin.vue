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
    <span class="user-login__label">Bonjour {{ currentUser.login }}</span>
    <button @click="UserStore.logout()" class="button is-danger">
      Déconnexion <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
    </button>
  </section>
  <section class="user-login" v-else>
    <fieldset class="user-login__label">
      <font-awesome-icon :icon="['fas', 'user']" class="icon is-small" />
      <input
      type="text"
      placeholder="Nom d'utilisateur"
      name="login"
      class="input user-login__input"
      v-model.lazy.trim="login"
      required
      />
      <font-awesome-icon :icon="['fas', 'unlock']" />
      <input
        type="password"
        placeholder="Mot de passe"
        class="input user-login__input"
        v-model.lazy.trim="password"
        required
      />
    </fieldset>
    <button
      class="button is-primary user-login__input"
      @click.prevent="UserStore.authenticate(login, password)"
    >
      <font-awesome-icon :icon="['fas', 'sign-in-alt']" /> Connexion
    </button>
  </section>
</template>

<style lang="scss" scoped>
.user-login {
  display: flex;
  align-items: self-end;
  justify-content: center;
  gap: 1rem;
  flex-flow: row wrap;
  padding: 1.5rem;
  border-inline-start: 2px solid var(--border-color);
  &__label {
    color: var(--color-text);
    flex: 1;
  }
  &__input {
    display: block;
    margin: 0.5rem 0;
    max-width: 200px;
  }
}
</style>
