<script setup>
import GlobalHeader from '@/components/GlobalHeader.vue'
import IndivParcours from '@/components/IndivParcours.vue'
import UserLogin from '@/components/sub_components/UserLogin.vue'
import { computed, onBeforeMount, onMounted } from 'vue'

//stores
import { useParcoursStore } from '@/stores/parcours'
import { useUserStore } from '@/stores/users'
const UserStore = useUserStore()
//user store computed for easier access
const currentUser = computed(() => UserStore.currentUser)
const week = computed(() => currentUser.value?.parcours.week)
const day = computed(() => currentUser.value?.parcours.day)

const ParcoursStore = useParcoursStore()
const currentParcours = computed(() => ParcoursStore.currentParcours)

onBeforeMount(() => {
  if (!currentUser.value) {
    window.location.href = '/'
  }
})

//fetch parcours
onMounted(() => {
  if (currentUser.value != null) {
    console.log('finding parcours for user', currentUser.value.parcours.parcours_id._id)
    ParcoursStore.selectParcours(currentUser.value.parcours.parcours_id._id) //should be linked to user parcours._id
  }
})
</script>

<template>
  <GlobalHeader />
  <main class="home" v-if="!currentParcours">
    <h2>Veuillez vous connecter et choisir un programme pour avoir acces à l'application</h2>
  </main>
  <main class="training" v-else>
    <h2 class="title">Votre programme d'entrainement</h2>
    <section v-if="currentUser">
      <h3>Votre progression:</h3>
      <section class="training__program training__details">
        <p class="training__details__data">Utilisateur: {{ currentUser.login }}</p>
        <p class="training__details__data">Nom du parcours: {{ currentParcours.name }}</p>
      </section>
      <section class="training__state training__details">
        <p class="training__details__data">Semaine en cours: {{ week }}</p>
        <p class="training__details__data">Prochain jour: {{ day }}</p>
        <p class="training__details__data">
          Votre progression de la semaine {{ currentUser.parcours.week }}:
              <progress class="progress is-small is-info"
                :value="currentUser.parcours.day-1" max="3"></progress>
        </p>
      </section>
      <section class="training__state training__details">
        <p v-if="week > 1 && day > 1">Previous Exercice:</p>
        <p class="training__details__data">
          Premier exercicde de la séance:
          {{ currentParcours.semaines[week - 1].jours[day - 1].exercices[1].type }}
        </p>
        <p class="training__details__data">
          Durée totale de la prochaine séance:
          {{ currentParcours.semaines[week - 1].jours[day - 1].tot_duree }} min
        </p>
      </section>
    </section>
    <section class="controls">
      <router-link to="/running" class="button is-success">
        On y va !
      </router-link>
      <!--start of reset controls-->
      <button class="button is-danger" @click.prevent="UserStore.resetParcours()">
        Recommencer le parcours
      </button>
      <button class="button is-danger" @click.prevent="UserStore.resetWeek()">Redémarrer la semaine</button>
      <button class="button is-danger" @click.prevent="UserStore.resetDay()">Redémarrer le jour</button>
    </section>
  </main>
  <router-link to="/" class="button">
    <font-awesome-icon icon="arrow-left" /> Retour à l'accueil
  </router-link>
</template>

<style scoped lang="scss">
.training {
  padding: 2rem;
  display: flex;
  flex-flow: column wrap;
  &__details {
    //shared styles for program and state sections
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    gap: 1rem;
    justify-content: space-around;
    &__data {
      font-weight: bold;
      width: 100%;
    }
  }
  &__state {
    border: none;
    border-radius: 0px;
    border-left: 1px solid var(--border-color);
    margin-inline-start: 1rem;
  }
}

.controls {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 420px;
  margin: 0 auto;
  .button {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    &:first-child {
      margin-right: 1rem;
      width: 100%;
      font-weight: bold;
    }
  }
}
</style>
