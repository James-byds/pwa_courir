<script setup>
import { computed, onBeforeMount, onMounted } from 'vue'
//components and stores
import GlobalHeader from '@/components/GlobalHeader.vue'
import { useParcoursStore } from '@/stores/parcours'
const ParcoursStore = useParcoursStore()
import { useUserStore } from '@/stores/users'
const UserStore = useUserStore()

//computed
const currentUser = computed(() => UserStore.currentUser)
const allParcours = computed(() => ParcoursStore.allParcours)


//check if curentUser is defined
onBeforeMount(() => {
  if (!currentUser.value) {
    window.location.href = '/'
  }
})

//fetch parcours
onMounted(() => {
  ParcoursStore.fetchParcours()
  console.log('Parcours fetched')
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
          <button @click.prevent="UserStore.registerParcours(parcours._id)">S'inscrire</button>
        </li>
      </ol>
    </section>
    <p v-else="!allParcours">fetch foiré</p>
  </main>
</template>
