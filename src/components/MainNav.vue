<template>
  <nav class="main-nav">
    <h1 class="main-nav__title">My App</h1>
    <ul class="main-nav__links">
      <li class="main-nav__links__item">
        <router-link to="/" class="main-nav__links__item--link">Home</router-link>
      </li>
      <!-- Add more navigation links as needed -->
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.main-nav {
  background-color: #333;
  padding: 1rem;
  &__title {
    color: white;
    margin: 0 0 0.5rem 0;
  }
  &__links {
    display: flex;
    gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
    &__item {
      &--link {
        color: white;
        text-decoration: none;
        transition: all 0.3s ease;
        border: 1px solid #000;
        padding: 0.5rem 1rem;
        &:hover {
          text-decoration: underline;
          color: #ddd;
        }
      }
    }
  }
}
</style>
