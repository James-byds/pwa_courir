import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const apiUrl = 'https://jsonplaceholder.typicode.com/Parcourss' //for later uses

export const useParcoursStore = defineStore('Parcours', {
  state: () => ({
    parcours: [
      {
        _id: 0,
        name: 'Débutant 0-5 km',
        description:
          'Programme d’un total de 12 semaines destiné à amener un coureur débutant à parcourir 5 km sans s’arrêter, en alternant échauffement, marche, course lente et étirements.',
        duree: '12 semaines',
        coureurs: [1],
        semaines: [
          {
            jours: [
              {
                tot_duree: 30,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 0.5,
                  },
                  {
                    type: 'marche',
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 1,
                  },
                  {
                    type: 'marche',
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 1.5,
                  },
                  {
                    type: 'marche',
                    duree: 1.5,
                  },
                  {
                    type: 'trot',
                    duree: 2,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 1.5,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 1,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
              {
                tot_duree: 29,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 1,
                  },
                  {
                    type: 'marche',
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 1.5,
                  },
                  {
                    type: 'marche',
                    duree: 1.5,
                  },
                  {
                    type: 'trot',
                    duree: 2,
                  },
                  {
                    type: 'marche',
                    duree: 2.5,
                  },
                  {
                    type: 'trot',
                    duree: 2,
                  },
                  {
                    type: 'marche',
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 1,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
              {
                tot_duree: 31,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 1,
                  },
                  {
                    type: 'marche',
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 2,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 2.5,
                  },
                  {
                    type: 'marche',
                    duree: 3,
                  },
                  {
                    type: 'trot',
                    duree: 2.5,
                  },
                  {
                    type: 'marche',
                    duree: 2.5,
                  },
                  {
                    type: 'trot',
                    duree: 1,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        _id: 1,
        name: 'Intermédiaire 5-10 km',
        description:
          'Programme de 12 semaines pour poursuivre après le 0-5 km, optimisé pour les coureurs ayant une base sportive ou ayant fini le cycle précédent.',
        duree: '12 semaines',
        coureurs: [2],
        semaines: [
          {
            jours: [
              {
                tot_duree: 33,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 5,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 5,
                  },
                  {
                    type: 'marche',
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 6,
                  },
                  {
                    type: 'marche',
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 6,
                  },
                  {
                    type: 'marche',
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 7,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
            ],
          },
        ],
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
