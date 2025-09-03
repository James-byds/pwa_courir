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
  if (currentUser.value != null) {
    ParcoursStore.selectParcours(currentUser.value.parcours._id - 1) //should be linked to user parcours._id
  }
})
</script>

<template>
  <GlobalHeader />
  <main class="home" v-if="!currentUser">
    <h2>Please log in to access your training plan</h2>
  </main>
  <main class="training" v-else>
    <h2>Training View</h2>
    <pre>
      Current User parcours data:
      {{ currentParcours }}
    </pre>
    <section v-if="currentUser">
      <h3>User Progression Data:</h3>
      <section class="training__program training__details">
        <p>Current User: {{ currentUser.login }}</p>
        <p>Current Parcours ID: {{ currentUser.parcours._id }}</p>
        <p>Parcours Name: {{ currentParcours.name }}</p>
      </section>
      <section class="training__state training__details">
        <p>Current Week: {{ week }}</p>
        <p>Current Day: {{ day }}</p>
      </section>
      <section class="training__state training__details">
        <p v-if="week > 1 && day > 1">Previous Exercice:</p>
        <p>
          Current Exercice:
          {{ currentParcours.semaines[week - 1].jours[day - 1].exercices[0].type }}
        </p>
        <p>
          Estimated time for next exercice:
          {{ currentParcours.semaines[week - 1].jours[day - 1].tot_duree }} min
        </p>
      </section>
    </section>
    <section class="controls">
      <button class="button is-success" @click.prevent="UserStore.startTraining()">
        Start training session
      </button>
      <!--start of reset controls-->
      <button class="button is-danger" @click.prevent="UserStore.resetParcours()">
        Reset Parcours
      </button>
      <button class="button is-danger" @click.prevent="UserStore.resetWeek()">Restart Week</button>
      <button class="button is-danger" @click.prevent="UserStore.resetDay()">Reset Day</button>
    </section>
  </main>
  <router-link to="/">Go back to Home</router-link>
</template>

<style scoped lang="scss">
.training {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  &__details {
    //shared styles for program and state sections
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    display: flex;
    justify-content: space-around;
  }
  &__state {
    max-width: 420px;
    margin-inline-start: 2rem;
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
