import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

/*Local values
const apiUrl = 'http://127.0.0.1/api_courrir/api/content/item/users' //for later uses
*/
const apiUrl = 'https://ingrwf12.cepegra-frontend.xyz/cockpit_james_2/api/content/item/users' //for later uses

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    currentUser: null,
  }),
  getters: {
    allUsers: (state) => state.users,
  },
  actions: {
    //New User
    async addUser(user) {
      console.log(user)
      const { data, error } = await useFetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(user),
      })
        .post()
        .json()
      if (!error.value) {
        console.log(data.value)
        this.users.push(data.value)
        this.currentUser = data.value
      } else {
        console.error(error.value)
      }
    },
    //AUTH
    async authenticate(login, password) {
      //add filters
      const filters = `?filter={"login":"${encodeURIComponent(login)}","password":"${encodeURIComponent(password)}"}`
      const { data, error } = await useFetch(apiUrl + filters, {
        //cockpit fait chier donc les filters sont dans l'url
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .get()
        .json()
      if (!error.value) {
        console.log('data value', data.value)
        this.currentUser = data.value
        console.log('new user', this.currentUser)
      } else {
        //no user found
        console.error(error.value)
        console.log('no user found')
        return false
      }
    },
    logout() {
      this.currentUser = null
      //redirect to home page
      window.location.href = '/'
    },
    //Register to a parcours
    async registerParcours(parcoursId) {
      this.currentUser.parcours = {
        parcours_id: {
          _id: parcoursId,
          _model: 'parcours',
        },
        week: 1,
        day: 1,
        exercice: 1,
      }
      this.postRequest()
    },
    //ALL RESETS FUNCTIONS
    resetParcours(parcoursId) {
      if (this.currentUser) {
        this.currentUser.parcours.week = 1
        this.currentUser.parcours.day = 1
        this.currentUser.parcours.exercice = 1
        this.postRequest()
      }
    },
    resetWeek(parcoursId) {
      if (this.currentUser) {
        this.currentUser.parcours.day = 1
      }
      this.postRequest()
    },
    resetDay(parcoursId) {
      if (this.currentUser) {
        //this.currentUser.parcours.timer = this.parcoursStore.currentParcours.timer
        this.currentUser.parcours.timer = 60 //placeholder
      }
    },
    //progress
    progressTraining(program_length) {
      //local update
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
          //user finished the training what do we do?
        }
        console.log(this.currentUser.parcours.day)
        console.log(this.currentUser.parcours.week)
        //api update
        this.postRequest()
      }
    },
    //Post general request for parcours update
    async postRequest() {
      const sentData = {
        //detailled format to adapt to cockpit api methods
        data: {
          _id: this.currentUser._id,
          parcours: this.currentUser.parcours,
        },
      }
      const { data, error } = await useFetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          //Bearer token if needed
        },
        body: JSON.stringify(sentData),
      })
        .post()
        .json()
      if (!error.value) {
        console.log(data.value)
      } else {
        console.error(error.value)
      }
    },
  },
})
