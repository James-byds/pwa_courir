<script setup>
import GlobalHeader from '@/components/GlobalHeader.vue'
import RegisterUser from '@/components/RegisterUser.vue'
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/users'

const UserStore = useUserStore()
const currentUser = computed(() => UserStore.currentUser)
</script>

<template>
  <GlobalHeader />
  <main class="home">
    <h1>Bienvenue dans votre application Je cours pour ma forme</h1>
    <div v-if="!currentUser">
      Connectez vous pour acceder aux autres fonctionnalités de l'application
      <span>Nouvel utilisateur? Inscrivez vous :</span>
      <RegisterUser v-show="!currentUser" />
    </div>
    <div v-else-if="currentUser.parcours" >
      <p>Vous pouvez retrouver votre programme d'entrainement en cliquant sur le bouton ci-dessous</p>
      <router-link to="/training" class="button is-primary">Programme d'entrainement</router-link>
    </div>
    <div v-else>
      <p>Inscrivez vous à l'un de nos programmes d'entrainement</p>
      <router-link to="/parcours" class="button is-primary">Liste de nos programmes</router-link>
    </div>
  </main>
</template>

<style scoped lang="scss">
.home {
  padding: 2rem;
  text-align: center;
}
</style>
