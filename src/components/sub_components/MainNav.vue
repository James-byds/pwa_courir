<script setup>
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/users'
import { setLocalStorage } from '@/assets/localstorage'

const UserStore = useUserStore()
const currentUser = computed(() => UserStore.currentUser)
watch(currentUser, () => {
  setLocalStorage("users", currentUser.value)
})

const router = useRouter()
const currentRoute = computed(() => router.currentRoute.value)
const filteredRoutes = computed(() =>
  router.getRoutes().filter((route) => route.name !== 'Running'),
)
</script>

<template>
  <nav class="main-nav" v-if="currentUser">
    <router-link
      v-for="route in filteredRoutes"
      :key="route.name"
      :to="route.path"
      class="main-nav__links"
      :class="{ 'main-nav__links--active': route.path === currentRoute.path }"
      >{{ route.name }}</router-link
    >
  </nav>
</template>

<style scoped lang="scss">
.main-nav {
  background-color: var(--primary-color);
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  border: 1px solid var(--border-color);
  &__links {
    background-color: var(--secondary-color);
    gap: 1rem;
    list-style: none;
    color: var(--color-text);
    text-decoration: none;
    transition: all var(--transition-speed) ease;
    border: 1px solid var(--border-color);
    padding: 0.5rem 1rem;
    &--active {
      background: var(--primary-color);
      border-radius: 5px;
      color: white;
      font-weight: bold;
    }
    &:hover {
      text-decoration: underline;
      color: #ddd;
      background: var(--secondary-color);
      border-radius: 5px;
      scale: 1.2;
    }
  }
}
</style>
