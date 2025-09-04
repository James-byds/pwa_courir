<script setup>
import { useParcoursStore } from '@/stores/parcours'
import { useUserStore } from '@/stores/users'
import { ref, computed, onBeforeMount, onMounted, defineProps } from 'vue'
import { useWakeLock } from '@vueuse/core' //canceling screen sleep
const wakeLock = useWakeLock() //storing the wake lock

import GlobalHeader from '@/components/GlobalHeader.vue'

//stores
const UserStore = useUserStore()
//user store computed for easier access
const currentUser = computed(() => UserStore.currentUser)
const week = computed(() => currentUser.value?.parcours.week)
const day = computed(() => currentUser.value?.parcours.day)

const ParcoursStore = useParcoursStore()
const currentParcours = computed(() => ParcoursStore.currentParcours)

const etape = ref(0) //current step in the exercices
const timer = ref(null) //timer reference for clearing it later
const state = ref('idle') //idle, running, paused
const running = ref(null)
onBeforeMount(() => {})
//recover parcours structure and program for the day
if (currentUser.value != null) {
  ParcoursStore.selectParcours(currentUser.value.parcours.parcours_id._id) //should be linked to user parcours._id//should be linked to user parcours._id
}
const program = computed(
  () => currentParcours.value.semaines[week.value - 1].jours[day.value - 1].exercices,
)
//access to values with program[0].type and program[0].duree

onMounted(() => {
  //start the timer
  timer.value = program.value[etape.value].duree * 60
})

//clik handlers
const startTraining = () => {
  //resume and start wakelock
  const lockScreen = async () => {
    if (wakeLock.isSupported) {
      await wakeLock.request('screen')
      console.log('screen locked')
    } else {
      console.log('wake lock not supported')
    }
  }
  lockScreen()
  if (state.value === 'paused' && !running.value) {
    state.value = 'running'
    running.value = setInterval(() => {
      if (timer.value > 0 && state.value === 'running') {
        timer.value = timer.value - 15
      } else if (program.value[etape.value + 1]) {
        etape.value++
        timer.value = program.value[etape.value].duree * 60
      } else {
        clearInterval(running.value)
        running.value = null
        state.value = 'idle'
      }
    }, 1000)
    console.log('Training resumed')
  } else if (state.value === 'idle' && !running.value) {
    // fresh start
    etape.value = 0
    timer.value = program.value[etape.value].duree * 60
    state.value = 'running'
    running.value = setInterval(() => {
      if (timer.value > 0 && state.value === 'running') {
        timer.value = timer.value - 30
      } else if (program.value[etape.value + 1]) {
        etape.value++
        timer.value = program.value[etape.value].duree * 60
      } else {
        clearInterval(running.value)
        running.value = null
        state.value = 'idle'
        console.log('Training finished')
        //progress the user
        UserStore.progressTraining(currentParcours.value.semaines.length)
        etape.value = 0
      }
    }, 1000)
    console.log('Training started')
  }
}

const pauseTraining = () => {
  if (running.value) {
    clearInterval(running.value)
    running.value = null
    state.value = 'paused'
    console.log('Training paused')
    //stop wakelock
    unlockScreen()
  }
}

const stopTraining = () => {
  if (running.value) {
    clearInterval(running.value)
    running.value = null
  }
  //resets values
  state.value = 'idle'
  etape.value = 0
  timer.value = program.value[etape.value].duree * 60
  console.log('Training stopped')
  unlockScreen()
}

//stop wakelock
const unlockScreen = async () => {
  if (wakeLock.isSupported) {
    await wakeLock.release()
    console.log('screen unlocked')
  }
}
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
    {{ day.value }}
    <section class="running__dashboard">
      <div class="running__dashboard__state">
        <p>{{ etape + 1 }}/{{ program.length }}</p>
        <p>{{ state }}</p>
      </div>
      <div class="running__dashboard__step">
        Current Exercice:
        <p>{{ program[etape].type }}</p>
      </div>
      <div class="running__dashboard__timer">
        <p>{{ timer }} sec</p>
      </div>
      <p>Semaine {{ week }}/ Jour {{ day }}</p>
      <div class="running__dashboard__next">
        <p v-if="etape < program.length - 1">
          next exercice:
          {{ program[etape + 1].type }} - {{ program[etape + 1].duree }} min
        </p>
        <p v-else>Go get it!</p>
      </div>
    </section>
    <section class="controls">
      <button class="button is-success" @click.prevent="startTraining()">
        <p v-if="state === 'paused'">Resume</p>
        <p v-else>Start</p>
      </button>
      <button class="button is-danger" @click.prevent="stopTraining()">Stop</button>
      <button class="button is-warning" @click.prevent="pauseTraining()">Pause</button>
    </section>
  </main>
</template>
