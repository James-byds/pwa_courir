import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const apiUrl = 'https://jsonplaceholder.typicode.com/users' //for later uses

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
    authenticate(login, password) {
      console.log(login, password)
      const user = this.users.find((u) => u.login === login && u.password === password)
      console.log(user)
      if (user) {
        this.currentUser = user
        console.log(this.currentUser)
        return true
      }
      return false
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
    //training
    startTraining(timer, etape, program) {
      console.log('Training started')
      const running = setInterval(() => {
        if (timer > 0) {
          timer = timer - 15
          console.log('Remaining time:', timer)
        } else if (program[etape + 1]) {
          console.log('Exercice finished: ' + program[etape].type)
          etape++
          timer = program[etape].duree * 60
        } else {
          etape++
          console.log('Training finished')
          clearInterval(running)
        }
      }, 1000)
    },
    pauseTraining() {
      if (this.currentUser) {
        //pause the timer
        console.log('Training paused')
      }
    },
    stopTraining() {
      if (this.currentUser) {
        //stop the timer
        console.log('Training stopped')
      }
    },
    //End of training fuctions
  },
})
