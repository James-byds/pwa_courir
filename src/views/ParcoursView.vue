<script setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue'
//components and stores
import GlobalHeader from '@/components/GlobalHeader.vue'
import { useParcoursStore } from '@/stores/parcours'
const ParcoursStore = useParcoursStore()
import { useUserStore } from '@/stores/users'
const UserStore = useUserStore()

//style related
const isHovered = ref(null)

//computed
const currentUser = computed(() => UserStore.currentUser)
const allParcours = computed(() => ParcoursStore.allParcours)

//check if curentUser is defined
onBeforeMount(() => {
  if (!currentUser.value) {
    window.location.href = '/'
  }
})
//fetch parcours
onMounted(() => {
  ParcoursStore.fetchParcours()
  console.log('Parcours fetched')
})
</script>

<template>
  <GlobalHeader />
  <main class="parcours">
    <div class="parcours_intro" v-if="!currentUser.parcours">
      <h1 class="title">Listes des programmes d'entrainement</h1>
      <p>Retrouvez les programmes d'entrainement disponibles</p>
      <p>Une fois inscrits, vous pourrez suivre votre progression</p>
    </div>
    <div class="parcours_intro" v-else>
      <h1 class="title">Vous etes inscrit à un programme d'entrainement</h1>
      <p>Continuez votre progression en cliquant sur le bouton ci-dessous</p>
      <router-link to="/training" class="button is-primary">Programme d'entrainement</router-link>
    </div>
    <section v-if="allParcours">
      <ol class="parcours__list">
        <li v-for="parcours in allParcours" :key="parcours.id" class="parcours__list__item card"
        :class="{'is-info': parcours._id === currentUser?.parcours?.parcours_id._id}">
          <!--INFOS GENERALES DU PARCOURS-->
          <h2 class="parcours__list__item__name">{{ parcours.name }}</h2>
          <div class="parcours__list__item__infos card-content">
            <p>{{ parcours.description }}</p>
            <p>Durée: {{ parcours.duree }}</p>
            <div class="parcours__list__item__infos__progress" v-if="currentUser.parcours">
              Votre progression du programme:
              <progress class="progress is-small is-info"
                :value="currentUser.parcours.week" max="12"></progress>
                <button class="button is-warning" @click.prevent="UserStore.deleteParcours()">Se désincrire du parcours</button>
            </div>
          </div>
          <button
            class="button is-success is-fullwidth parcours__list__item__button"
            :class="{ 'is-outlined': isHovered !== parcours._id }"
            :disabled="parcours._id === currentUser?.parcours?.parcours_id._id"
            @mouseover="isHovered = parcours._id"
            @mouseleave="isHovered = null"
            @click.prevent="UserStore.registerParcours(parcours._id)"
          >
            S'inscrire
          </button>
        </li>
      </ol>
    </section>
    <p v-else>fetch foiré</p>
  </main>
</template>

<style lang="scss">
.parcours {
  text-align: center;
}
.parcours__list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  &__item {
    //displays flex
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    //box style and border
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding-inline: 2rem;
    padding-block: 1rem;
    &__name {
      font-size: var(--font-size-lg);
      font-weight: bold;
    }
    &__infos {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    &__button {
      padding-block: 1rem;
    }
  }
}
</style>
