<script setup>
import GlobalHeader from '@/components/GlobalHeader.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/users'

const UserStore = useUserStore()
const currentUser = ref(UserStore.currentUser)
</script>

<template>
  <GlobalHeader />
  <main class="home">
    <h1>Welcome to the Home Page</h1>
    <p>This is the main landing page of the application.</p>
    <p v-show="!currentUser">Please log in to access more features.</p>
  </main>
</template>

<style scoped lang="scss">
.home {
  padding: 2rem;
  text-align: center;
}
</style>
