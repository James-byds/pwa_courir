import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

const apiUrl = 'http://127.0.0.1/api_courrir/api/content/items/parcours' //for later uses

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
                tot_duree: 28.5,
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
                tot_duree: 32.5,
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
          {
            jours: [
              {
                tot_duree: 38,
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
                    duree: 2.5,
                  },
                  {
                    type: 'trot',
                    duree: 3,
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
              {
                tot_duree: 34,
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
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 3,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 3,
                  },
                  {
                    type: 'marche',
                    duree: 2,
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
                tot_duree: 36,
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
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 3,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 4,
                  },
                  {
                    type: 'marche',
                    duree: 3,
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
            ],
          },
          {
            jours: [
              {
                tot_duree: 35.5,
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
                    duree: 0.5,
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
                    duree: 3,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 4,
                  },
                  {
                    type: 'marche',
                    duree: 3,
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
                tot_duree: 34.5,
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
                    duree: 0.5,
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
                    duree: 3,
                  },
                  {
                    type: 'marche',
                    duree: 1.5,
                  },
                  {
                    type: 'trot',
                    duree: 4,
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
                tot_duree: 35.5,
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
                    duree: 0.5,
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
                    duree: 3,
                  },
                  {
                    type: 'marche',
                    duree: 1.5,
                  },
                  {
                    type: 'trot',
                    duree: 4,
                  },
                  {
                    type: 'marche',
                    duree: 2.5,
                  },
                  {
                    type: 'trot',
                    duree: 2.5,
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
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
            ],
          },
          {
            jours: [
              {
                tot_duree: 35.5,
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
                    duree: 0.5,
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
                    duree: 3,
                  },
                  {
                    type: 'marche',
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 4,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 3,
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
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
              {
                tot_duree: 37,
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
                    duree: 0.5,
                  },
                  {
                    type: 'trot',
                    duree: 2,
                  },
                  {
                    type: 'marche',
                    duree: 0.5,
                  },
                  {
                    type: 'trot',
                    duree: 3,
                  },
                  {
                    type: 'marche',
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 4,
                  },
                  {
                    type: 'marche',
                    duree: 2,
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
                    duree: 5,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
              {
                tot_duree: 39,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 2,
                  },
                  {
                    type: 'marche',
                    duree: 0.5,
                  },
                  {
                    type: 'trot',
                    duree: 3,
                  },
                  {
                    type: 'marche',
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 4,
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
                    duree: 3,
                  },
                  {
                    type: 'trot',
                    duree: 2,
                  },
                  {
                    type: 'marche',
                    duree: 0.5,
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
          {
            jours: [
              {
                tot_duree: 41.5,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 2,
                  },
                  {
                    type: 'marche',
                    duree: 0.5,
                  },
                  {
                    type: 'trot',
                    duree: 4,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 4,
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
                    duree: 3,
                  },
                  {
                    type: 'trot',
                    duree: 4,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
              {
                tot_duree: 45,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 3,
                  },
                  {
                    type: 'marche',
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 4,
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
                    duree: 3,
                  },
                  {
                    type: 'trot',
                    duree: 5,
                  },
                  {
                    type: 'marche',
                    duree: 3,
                  },
                  {
                    type: 'trot',
                    duree: 4,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
              {
                tot_duree: 42,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 3,
                  },
                  {
                    type: 'marche',
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 4,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 4,
                  },
                  {
                    type: 'marche',
                    duree: 3,
                  },
                  {
                    type: 'trot',
                    duree: 3,
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
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
            ],
          },
          {
            jours: [
              {
                tot_duree: 44,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 3,
                  },
                  {
                    type: 'marche',
                    duree: 1,
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
                    duree: 4,
                  },
                  {
                    type: 'marche',
                    duree: 3,
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
                    duree: 5,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
              {
                tot_duree: 46,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 3,
                  },
                  {
                    type: 'marche',
                    duree: 1,
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
                    duree: 3,
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
                    duree: 5,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
              {
                tot_duree: 48,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 3,
                  },
                  {
                    type: 'marche',
                    duree: 1,
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
                    duree: 6,
                  },
                  {
                    type: 'marche',
                    duree: 3,
                  },
                  {
                    type: 'trot',
                    duree: 7,
                  },
                  {
                    type: 'marche',
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 5,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
            ],
          },
          {
            jours: [
              {
                tot_duree: 47,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 3,
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
                    duree: 3,
                  },
                  {
                    type: 'trot',
                    duree: 7,
                  },
                  {
                    type: 'marche',
                    duree: 3,
                  },
                  {
                    type: 'trot',
                    duree: 9,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
              {
                tot_duree: 48,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 3,
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
                    duree: 3,
                  },
                  {
                    type: 'trot',
                    duree: 8,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 10,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
              {
                tot_duree: 54,
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
                    duree: 3,
                  },
                  {
                    type: 'trot',
                    duree: 4,
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
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 5,
                  },
                  {
                    type: 'marche',
                    duree: 3,
                  },
                  {
                    type: 'trot',
                    duree: 10,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
            ],
          },
          {
            jours: [
              {
                tot_duree: 50,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 4,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 6,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 8,
                  },
                  {
                    type: 'marche',
                    duree: 3,
                  },
                  {
                    type: 'trot',
                    duree: 10,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
              {
                tot_duree: 52,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 6,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 10,
                  },
                  {
                    type: 'marche',
                    duree: 3,
                  },
                  {
                    type: 'trot',
                    duree: 4,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 10,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
              {
                tot_duree: 52,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 6,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 8,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 8,
                  },
                  {
                    type: 'marche',
                    duree: 3,
                  },
                  {
                    type: 'trot',
                    duree: 8,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
            ],
          },
          {
            jours: [
              {
                tot_duree: 55,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 8,
                  },
                  {
                    type: 'marche',
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 8,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 8,
                  },
                  {
                    type: 'marche',
                    duree: 3,
                  },
                  {
                    type: 'trot',
                    duree: 10,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
              {
                tot_duree: 52,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 8,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 4,
                  },
                  {
                    type: 'marche',
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 10,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 10,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
              {
                tot_duree: 56,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 10,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 4,
                  },
                  {
                    type: 'marche',
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 10,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 12,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
            ],
          },
          {
            jours: [
              {
                tot_duree: 55,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 12,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 10,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 14,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
              {
                tot_duree: 55,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 12,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 10,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 14,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
              {
                tot_duree: 54,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 12,
                  },
                  {
                    type: 'marche',
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 10,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 14,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
            ],
          },
          {
            jours: [
              {
                tot_duree: 53,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 16,
                  },
                  {
                    type: 'marche',
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 4,
                  },
                  {
                    type: 'marche',
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 16,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
              {
                tot_duree: 54,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 14,
                  },
                  {
                    type: 'marche',
                    duree: 1,
                  },
                  {
                    type: 'trot',
                    duree: 4,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 18,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
              {
                tot_duree: 52,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 16,
                  },
                  {
                    type: 'marche',
                    duree: 3,
                  },
                  {
                    type: 'trot',
                    duree: 18,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
            ],
          },
          {
            jours: [
              {
                tot_duree: 52,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 10,
                  },
                  {
                    type: 'marche',
                    duree: 2,
                  },
                  {
                    type: 'trot',
                    duree: 25,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
              {
                tot_duree: 52,
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
                    duree: 30,
                  },
                  {
                    type: 'étirements',
                    duree: 5,
                  },
                ],
              },
              {
                tot_duree: 55,
                exercices: [
                  {
                    type: 'échauffement',
                    duree: 10,
                  },
                  {
                    type: 'trot',
                    duree: 40,
                  },
                  {
                    type: 'étirements',
                    duree: 1,
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
    async fetchParcours() {
      const { data, error } = await useFetch(apiUrl).get().json()
      if (!error.value) {
        console.log('parcours before ', this.parcours)
        console.log('data details ', data.value)
        this.parcours = data.value
        console.log(this.parcours)
      } else {
        console.error(error.value)
      }
    },
    selectParcours(id) {
      const parcours = this.parcours.find((p) => p._id === id)
      console.log('parcours selected', parcours)
      if (parcours) {
        this.currentParcours = parcours
        return true
      }
    },
  },
})
