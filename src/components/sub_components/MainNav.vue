<script setup>
import { computed, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/users'
import { setLocalStorage } from '@/assets/localstorage'

const isMenuActive = ref(false)

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

const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value
}
</script>

<template>
<nav class="navbar main-nav">
  <div class="navbar-brand">
    <img src="@/assets/img/logo-48-48.png" alt="Logo" class="navbar-item">
    <span class="navbar-burger burger" 
    :class="{ 'is-active': isMenuActive }"
    @click="isMenuActive = !isMenuActive"
    data-target="navbar-menu">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </span>
  </div>
  <div id="navbar-menu" class="navbar-menu "
  :class="{ 'is-active': isMenuActive }">
    <div class="navbar-start">
      <router-link
      v-for="route in filteredRoutes"
      :key="route.name"
      :to="route.path"
      class="main-nav__links navbar-item"
      :class="{ 'main-nav__links--active': route.path === currentRoute.path }"
      >{{ route.name }}</router-link>
    </div>
  </div>
</nav>
</template>

<style scoped lang="scss">
.navbar-menu {
  background-color: unset;//unset bulma style
}

.main-nav {
  background-color: var(--primary-color);
  padding: 1rem;
  gap: 1rem;
  border: 1px solid var(--border-color);
  margin-inline: auto;
  &__links {
    background-color: var(--secondary-color);
    gap: 1rem;
    list-style: none;
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text);
    text-decoration: none;
    transition: all var(--transition-speed) ease;
    border: 1px solid var(--border-color);
    padding: 0.5rem 1rem;
    &--active {
      background: var(--primary-color);
      border-radius: 10px;
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
