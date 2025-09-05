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
    <h2>Inscription</h2>
    <form class="register-user__form">
      <input class="input is-rounded" required type="text" v-model.lazy.trim="login" placeholder="Nom d'utilisateur" />
      <input
        class="input is-rounded"
        required
        type="password"
        v-model.lazy.trim="password"
        placeholder="Mot de passe"
      />
      <input
        class="input is-rounded"
        required
        type="firstname"
        v-model.lazy.trim="firstname"
        placeholder="Prénom"
      />
      <input
        class="input is-rounded"
        required
        type="lastname"
        v-model.lazy.trim="lastname"
        placeholder="Nom"
      />
      <button type="submit" class="button is-info" @click.prevent="UserStore.addUser(newUser)">
        Inscription
      </button>
    </form>
  </div>
</template>


<style lang="scss" scoped>

.register-user {
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 420px;
  }
}

.input {
  margin: 0.5rem;
}
</style>