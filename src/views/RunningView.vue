<script setup>
import { useParcoursStore } from '@/stores/parcours'
import { useUserStore } from '@/stores/users'
import { ref, computed, onBeforeMount, onMounted, defineProps, watch } from 'vue'
import { useWakeLock } from '@vueuse/core' //canceling screen sleep
const wakeLock = useWakeLock() //storing the wake lock

import GlobalHeader from '@/components/GlobalHeader.vue'

//stores
const UserStore = useUserStore()
//user store computed for easier access
const currentUser = computed(() => UserStore.currentUser)
const week = computed(() => currentUser.value?.parcours.week)
const day = computed(() => currentUser.value?.parcours.day)
//parcours store
const ParcoursStore = useParcoursStore()
const currentParcours = computed(() => ParcoursStore.currentParcours)

//local running values
const etape = ref(0) //current step in the exercices
const timer = ref(null) //timer reference for clearing it later
const state = ref('idle') //idle, running, paused
const running = ref(null)
//init tracking values
const distanceTotal = ref(0)
const positions = ref([])
const watchId = ref(null)
const steps = ref(0)

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
  lockScreen() //smartphone screen lock
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
    startTracking() //tracking distance
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
    pauseTracking()
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
  stopTracking()
}
//end of click handlers

//resume and start wakelock
const lockScreen = async () => {
  if (wakeLock.isSupported) {
    await wakeLock.request('screen')
    console.log('screen locked')
  } else {
    console.log('wake lock not supported')
  }
}
//stop wakelock
const unlockScreen = async () => {
  if (wakeLock.isSupported) {
    await wakeLock.release()
    console.log('screen unlocked')
  }
}

//tracking functions
const getDistance = (pos1, pos2) => {
  console.log('pos1 ', pos1)
  console.log('pos2 ', pos2)
  //get distance in meters between two positions
  const Radius = 6371 // Radius of the earth in km
  const dLat = deg2rad(pos2.latitude - pos1.latitude) // deg2rad below
  const dLon = deg2rad(pos2.longitude - pos1.longitude)
  const a = //a is the Haversine formula
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(pos1.latitude)) *
      Math.cos(deg2rad(pos2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) // Distance in rad
  const distance = Radius * c * 1000 // Distance in km *1000 to get meters
  return distance
}

const deg2rad = (deg) => {
  // convert degrees to radians
  return deg * (Math.PI / 180)
}

const startTracking = () => {
  if (navigator.geolocation) {
    watchId.value = navigator.geolocation.watchPosition(
      (position) => {
        // console.log(position.coords.latitude, position.coords.longitude)
        const newPos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        if (positions.value.length > 0) {
          const lastPos = positions.value[positions.value.length - 1]
          console.log(lastPos)
          distanceTotal.value = distanceTotal.value + getDistance(newPos, lastPos)
          //round to 2 decimals
          distanceTotal.value = parseFloat(distanceTotal.value.toFixed(2))
        }
        positions.value.push(newPos)
      },
      (err) => {
        console.log(err)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000, // 10 seconds
      },
    )
  } else {
    console.log('Geolocation is not supported by this browser.')
  }
}
const stopTracking = () => {
  if (navigator.geolocation && watchId.value != null) {
    navigator.geolocation.clearWatch(watchId.value) //stop tracking
    watchId.value = null
    positions.value = []
  }
}
const pauseTracking = () => {
  if (navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId.value) //stop tracking but only pause no reset
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
        <p>{{ distanceTotal }} m</p>
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
