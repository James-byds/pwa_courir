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
        parcours_stage: 'Marathon', //placeholder
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
  },
})
