import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

const apiUrl = 'http://127.0.0.1/api_courrir/api/content/items/parcours' //for later uses
const apiUrlSolo = 'http://127.0.0.1/api_courrir/api/content/item/parcours' //for later uses

export const useParcoursStore = defineStore('Parcours', {
  state: () => ({
    parcours: [],
    currentParcours: null,
  }),
  getters: {
    allParcours: (state) => state.parcours,
  },
  actions: {
    async fetchParcours() {
      const { data, error } = await useFetch(apiUrl).get().json()
      if (!error.value) {
        this.parcours = data.value
        console.log(this.parcours)
      } else {
        console.error(error.value)
      }
    },
    async selectParcours(id) {
      const { data, error } = await useFetch(apiUrlSolo + '/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .get()
        .json()
      if (!error.value) {
        this.currentParcours = data.value
        console.log('parcours selected', this.currentParcours)
        return true
      } else {
        console.error(error.value)
        return false
      }
    },
  },
})
