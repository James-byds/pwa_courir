import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const apiUrl = 'https://jsonplaceholder.typicode.com/Parcourss' //for later uses

export const useParcoursStore = defineStore('Parcours', {
  state: () => ({
    parcours: [
      {
        _id: '1',
        name: 'Parcours 1',
        description: 'Description du parcours 1',
        semaines: {
          semaine1: {
            jour1: { duree: 20, type: 'endurance', 
              etapes: {
                echauffement: 10,
                endurance: 5,
                retourAuCalme: 5,
              }
             },
            jour2: { duree: 20, type: 'fractionné', 
              etapes: {
                echauffement: 10,
                endurance: 5,
                retourAuCalme: 5,
              }
             },
            jour3: { duree: 20, type: 'longue', 
              etapes: {
                echauffement: 10,
                endurance: 5,
                retourAuCalme: 5,
              }
             },
          },
        }
      }

    ],
    currentParcours: null,
  }),
  getters: {
    allParcourss: (state) => state.parcours,
  },
  actions: {},
})
