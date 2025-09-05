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

//local course values
const etape = ref(0) //current step in the exercices
const timer = ref(null) //timer reference for clearing it later
const rawTimer = ref(null) //timer reference for clearing it later
const state = ref('au repos') //au repos, course, pause
const course = ref(null)
//init tracking values
const distanceTotal = ref(0)
const positions = ref([])
const watchId = ref(null)
const steps = ref(0)

onBeforeMount(() => {
  if (!currentUser.value) {
    window.location.href = '/'
  }
})
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
  rawTimer.value = program.value[etape.value].duree * 60
  //convert to mm:ss
  convertTimer(rawTimer)
})

const convertTimer = (rawTimer) => {
  const minutes = Math.floor(rawTimer.value / 60)
  const seconds = rawTimer.value % 60
  timer.value = `${minutes<10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

//clik handlers
const startTraining = () => {
  lockScreen() //smartphone screen lock
  if (state.value === 'pause' && !course.value) {
    state.value = 'course'
    course.value = setInterval(() => {
      if (rawTimer.value > 0 && state.value === 'course') {
        rawTimer.value = rawTimer.value - 30
      } else if (program.value[etape.value + 1]) {
        etape.value++
        rawTimer.value = program.value[etape.value].duree * 60
      } else {
        clearInterval(course.value)
        course.value = null
        state.value = 'au repos'
      }
      convertTimer(rawTimer)
    }, 1000)
    console.log('Training resumed')
  } else if (state.value === 'au repos' && !course.value) {
    // fresh start
    startTracking() //tracking distance
    etape.value = 0
    rawTimer.value = program.value[etape.value].duree * 60
    state.value = 'course'
    course.value = setInterval(() => {
      if (rawTimer.value > 0 && state.value === 'course') {
        rawTimer.value = rawTimer.value - 30
      } else if (program.value[etape.value + 1]) {
        etape.value++
        rawTimer.value = program.value[etape.value].duree * 60
      } else {
        clearInterval(course.value)
        course.value = null
        state.value = 'au repos'
        console.log('Training finished')
        //progress the user
        UserStore.progressTraining(currentParcours.value.semaines.length)
        etape.value = 0
      }
      convertTimer(rawTimer)
    }, 1000)
    console.log('Training started')
  }
}

const pauseTraining = () => {
  if (course.value) {
    clearInterval(course.value)
    course.value = null
    state.value = 'pause'
    console.log('Training pause')
    //stop wakelock
    unlockScreen()
    pauseTracking()
  }
}
const stopTraining = () => {
  if (course.value) {
    clearInterval(course.value)
    course.value = null
  }
  //resets values
  state.value = 'au repos'
  etape.value = 0
  rawTimer.value = program.value[etape.value].duree * 60
  console.log('Training stopped')
  convertTimer(rawTimer)
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
  <main class="course">
    <h1>Cours hein gamin</h1>
    <p v-show="!currentUser">Veuillez vous connnecter</p>
    <p v-if="currentUser">Courreur: {{ currentUser.login }}</p>
    <p v-if="currentUser">Nom du parcours: {{ currentParcours.name }}</p>
    {{ day.value }}
    <p>etat de l'entrainement: {{ state }}</p>
    <section class="course__dashboard">
      <div class="course__dashboard__step">
        <p>{{ program[etape].type }}</p>
      </div>
      <div class="course__dashboard__timer">
        <p>{{ timer }} </p>
      </div>
      <div class="course__dashboard__state">
        <p>Etape {{ etape + 1 }}/{{ program.length }}</p>
        <progress class="progress is-success" :value="etape + 1" :max="program.length"></progress>
        <p>Semaine {{ week }}/ Jour {{ day }}</p>
      </div>
      <div class="course__dashboard__next">
        <p v-if="etape < program.length - 1">
          Prochaine étape:
          {{ program[etape + 1].type }} - {{ program[etape + 1].duree }} min
        </p>
        <p v-else>Allez y c'est la fin!</p>
        <p>Distance parcourue : {{ distanceTotal }} m</p>
      </div>
    </section>
    <section class="controls">
      <button class="button is-success" @click.prevent="startTraining()">
        <p v-if="state === 'pause'">Reprendre</p>
        <p v-else>Commencer</p>
      </button>
      <button class="button is-warning" @click.prevent="pauseTraining()"><p>Pause</p></button>
      <button class="button is-danger" @click.prevent="stopTraining()"><p>Stop</p></button>
    </section>
  </main>
  <router-link to="/" class="button">
    <font-awesome-icon icon="arrow-left" /> Retour à l'accueil
  </router-link>
</template>

<style lang="scss" scoped>
.course {
  max-width: 800px;
  min-width: 420px;
  margin: 0 auto;
  &__dashboard {
    background-color: var(--primary-color);
    border: 1px solid var(--border-color);
    display: flex;
    flex-flow: row wrap;
    gap: 1rem;
    justify-content: space-around;
    margin: 1rem;
    & div {
      width: 40%;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
    }
    &__step {
      font-size: var(--font-size-lg);
      text-transform: capitalize;
    }
    &__timer {
      font-size: var(--font-size-xl);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
    &__state {
      
    }
    &__next {
      
    }
  }
}

.controls {
  margin-top: 1rem;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 0 auto;
  & * {
    flex-grow: 1; 
    flex-basis: 1;
    width: 95%;
    padding-block: 0.5rem;
  }
}

</style>
