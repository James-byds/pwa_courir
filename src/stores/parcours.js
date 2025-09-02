import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const apiUrl = 'https://jsonplaceholder.typicode.com/Parcourss' //for later uses

export const useParcoursStore = defineStore('Parcours', {
  state: () => ({
    parcours: [
      {
        //parcours 0
        _id: 0,
        name: 'Parcours urbain',
        description:
          'Un parcours à travers les rues de la ville, avec des arrêts dans les parcs et les places publiques.',
        duree: '8 semaines',
        coureurs: [],
        deroulement: {
          semaine1: {
            jour1: {
              distance: 5, // in km
            },
          },
        },
      },
    ],
    currentParcours: null,
  }),
  getters: {
    allParcours: (state) => state.parcours,
  },
  actions: {
    selectParcours(id) {
      const parcours = this.parcours.find((p) => p._id === id)
      if (parcours) {
        this.currentParcours = parcours
        return true
      }
    },
  },
})
