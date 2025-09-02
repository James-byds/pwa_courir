<script setup>
import { computed, onBeforeMount, onMounted } from 'vue'
//components and stores
import GlobalHeader from '@/components/GlobalHeader.vue'
import IndivParcours from '@/components/IndivParcours.vue'
import { useParcoursStore } from '@/stores/parcours'
const ParcoursStore = useParcoursStore()
import { useUserStore } from '@/stores/users'
const UserStore = useUserStore()

//computed
const currentUser = computed(() => UserStore.currentUser)
const allParcours = computed(() => ParcoursStore.allParcours)

const inscrire = (parcours, user) => {
  console.log('Inscription request for parcours:', parcours)
  console.log('Inscription request for user:', user)
}

//check if curentUser is defined
onBeforeMount(() => {
  if (!currentUser.value) {
    window.location.href = '/'
  }
})
</script>

<template>
  <GlobalHeader />
  <main class="parcours">
    <h1>Parcours View</h1>
    <p>This is the Parcours page of the application.</p>
    <section v-if="allParcours">
      <ol>
        <li v-for="parcours in allParcours" :key="parcours.id">
          <!--INFOS GENERALES DU PARCOURS-->
          <h2>{{ parcours.name }}</h2>
          <p>{{ parcours.description }}</p>
          <p>duree: {{ parcours.duree }}</p>
          <button @click.prevent="inscrire(parcours._id, currentUser._id)">S'inscrire</button>
        </li>
      </ol>
    </section>
    <p v-else="!allParcours">fetch foiré</p>
  </main>
</template>
