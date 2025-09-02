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
        parcours_stage: 'Marathon',//placeholder
      }
    ],
    currentUser: null,
  }),
  getters: {
    allUsers: (state) => state.users,
  },
  actions: {
    
  }
})
