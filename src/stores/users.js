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
  },
})
