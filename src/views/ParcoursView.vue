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
    <h1>Parcours View</h1>
    <p>This is the Parcours page of the application.</p>
    <section v-if="allParcours">
      <ol class="parcours__list">
        <li v-for="parcours in allParcours" :key="parcours.id" class="parcours__list__item">
          <!--INFOS GENERALES DU PARCOURS-->
          <h2 class="parcours__list__item__name">{{ parcours.name }}</h2>
          <div class="parcours__list__item__infos">
            <p>{{ parcours.description }}</p>
            <p>Durée: {{ parcours.duree }}</p>
          </div>
          <button
            class="button is-success is-fullwidth parcours__list__item__button"
            :class="{ 'is-outlined': isHovered !== parcours._id }"
            @mouseover="isHovered = parcours._id"
            @mouseleave="isHovered = null"
            @click.prevent="UserStore.registerParcours(parcours._id)"
          >
            S'inscrire
          </button>
        </li>
      </ol>
    </section>
    <p v-else="!allParcours">fetch foiré</p>
  </main>
</template>

<style lang="scss">
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
