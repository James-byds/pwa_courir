<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <nav class="main-nav">
    <router-link
      v-for="route in router.getRoutes()"
      :key="route.name"
      :to="route.path"
      class="main-nav__links"
      >{{ route.name }}</router-link
    >
  </nav>
</template>

<style scoped lang="scss">
.main-nav {
  background-color: #333;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  &__links {
    gap: 1rem;
    list-style: none;
    color: var(--color-text);
    text-decoration: none;
    transition: all var(--transition-speed) ease;
    border: 1px solid var(--border-color);
    padding: 0.5rem 1rem;
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
