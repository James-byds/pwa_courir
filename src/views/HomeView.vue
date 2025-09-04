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
    <h1>Welcome to the Home Page</h1>
    <p>This is the main landing page of the application.</p>
    <div v-if="!currentUser">
      Please log in to access more features.
      <span>Nouvel utilisateur? Inscrivez vous :</span>
      <RegisterUser v-show="!currentUser" />
    </div>
  </main>
</template>

<style scoped lang="scss">
.home {
  padding: 2rem;
  text-align: center;
}
</style>
