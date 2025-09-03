<script setup>
import { useParcoursStore } from '@/stores/parcours'
import { useUserStore } from '@/stores/users'
import { ref, computed, onBeforeMount, onMounted, defineProps } from 'vue'

import GlobalHeader from '@/components/GlobalHeader.vue'

//stores
const UserStore = useUserStore()
//user store computed for easier access
const currentUser = computed(() => UserStore.currentUser)
const week = computed(() => currentUser.value?.parcours.week)
const day = computed(() => currentUser.value?.parcours.day)

const ParcoursStore = useParcoursStore()
const currentParcours = computed(() => ParcoursStore.currentParcours)

const props = defineProps({
  day: {
    type: Number,
    required: false,
    default: 1,
  },
  week: {
    type: Number,
    required: false,
    default: 1,
  },
})

const etape = ref(0) //current step in the exercices
const timer = ref(null) //timer reference for clearing it later

onBeforeMount(() => {
  //recover parcours structure and program for the day
  if (currentUser.value != null) {
    ParcoursStore.selectParcours(currentUser.value.parcours._id - 1) //should be linked to user parcours._id
  }
})
const program = computed(
  () => currentParcours.value.semaines[props.week - 1].jours[props.day - 1].exercices,
)
//access to values with program[0].type and program[0].duree
</script>

<template>
  <GlobalHeader />
  <main class="running">
    <h1>Running View</h1>
    <p>This is the Running page of the application.</p>
    <p v-show="!currentUser">Please log in to access more features.</p>
    <p v-if="currentUser">Current User: {{ currentUser.login }}</p>
    <p v-if="currentUser">Current Parcours ID: {{ currentUser.parcours._id }}</p>
    <p v-if="currentUser">Parcours Name: {{ currentParcours.name }}</p>
    {{ props.jour }}
    <section class="running__dashboard">
      {{ etape }}/{{ program.length }}
      <p>
        Current Exercice:
        {{ program[etape].type }}
      </p>
      <p>
        Estimated time for next exercice:
        {{ program[etape].duree }} min
      </p>
    </section>
    <section class="controls">
      <button class="button is-success" @click.prevent="UserStore.startTraining()">
        Start training session
      </button>
      <button class="button is-danger" @click.prevent="UserStore.stopTraining()">
        Stop training session
      </button>
      <button class="button is-warning" @click.prevent="UserStore.pauseTraining()">
        Pause training session
      </button>
    </section>
  </main>
</template>
