import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

const apiUrl = 'http://127.0.0.1/api_courrir/api/content/item/users' //for later uses

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [
      {
        _id: '1',
        login: 'John',
        name: 'John',
        password: 'Doe',
        parcours: {
          _id: 1, //should be linked with parcours store
          week: 1, //placeholder
          day: 1, //placeholder
          exercice: 1, //placeholder
          timer: 60, //in seconds, linked to current exercice
        },
      },
    ],
    currentUser: null,
  }),
  getters: {
    allUsers: (state) => state.users,
  },
  actions: {
    async authenticate(login, password) {
      console.log(login, password)
      //add filters
      const { data, error } = await useFetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        query: {
          login: login,
          password: password,
        },
      })
        .get()
        .json()
      if (!error.value) {
        this.currentUser = data.value
        console.log(this.currentUser)
      } else {
        console.error(error.value)
        return false
      }
    },
    logout() {
      this.currentUser = null
      //redirect to home page
      window.location.href = '/'
    },
    //ALL RESETS FUNCTIONS
    resetParcours(parcoursId) {
      if (this.currentUser) {
        this.currentUser.parcours.week = 1
      }
    },
    resetWeek(parcoursId) {
      if (this.currentUser) {
        this.currentUser.parcours.day = 1
      }
    },
    resetDay(parcoursId) {
      if (this.currentUser) {
        //need to fetch the base timer from parcours store
        //this.currentUser.parcours.timer = this.parcoursStore.currentParcours.timer
        this.currentUser.parcours.timer = 60 //placeholder
      }
    },
    //progress
    progressTraining(program_length) {
      if (this.currentUser) {
        console.log('progressTraining')
        if (this.currentUser.parcours.week < program_length) {
          if (this.currentUser.parcours.day > 2) {
            console.log('increment week')
            this.currentUser.parcours.week++
            this.currentUser.parcours.day = 1
          } else {
            console.log('increment day')
            this.currentUser.parcours.day++
          }
        } else {
          //user finished the training
        }
        console.log(this.currentUser.parcours.day)
        console.log(this.currentUser.parcours.week)
      }
    },
  },
})
