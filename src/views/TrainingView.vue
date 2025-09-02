<script setup>
import IndivParcours from '@/components/IndivParcours.vue'
import UserLogin from '@/components/sub_components/UserLogin.vue'
import { computed, onBeforeMount, onMounted } from 'vue'

//stores
import { useParcoursStore } from '@/stores/parcours'
import { useUserStore } from '@/stores/users'
const UserStore = useUserStore()
const currentUser = computed(() => UserStore.currentUser)
const ParcoursStore = useParcoursStore()
const currentParcours = computed(() => ParcoursStore.currentParcours)

onBeforeMount(() => {
  ParcoursStore.selectParcours(0)
})
</script>

<template>
  <UserLogin />
  <h2>Training View</h2>
  <IndivParcours :parcours="currentParcours" />
  <section class="controls">
    <button @click.prevent="UserStore.resetParcours()">Reset Parcours</button>
    <button @click.prevent="UserStore.resetWeek()">Restart Week</button>
    <button @click.prevent="UserStore.resetDay()">Reset Day</button>
  </section>
  <router-link to="/">Go back to Home</router-link>
</template>
