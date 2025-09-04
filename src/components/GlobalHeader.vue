<script setup>
import MainNav from '@/components/sub_components/MainNav.vue'
import UserLogin from '@/components/sub_components/UserLogin.vue'
</script>

<template>
  <header class="global-header">
    <section class="global-header__user">
      <img src="@/assets/img/logo.png" alt="logo" class="global-header__user__img"/>
      <h1 class="global-header__user__title">Je cours pour ma forme</h1>
      <UserLogin />
    </section>
    <MainNav />
  </header>
</template>

<style scoped lang="scss">
.global-header {
  background-color: #333; //integrer les couleurs de la MC
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  &__user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    &__img {
      color: white;
      margin: 0 1rem 0 0;
      min-width: 50px;
      aspect-ratio: 1/1;
      max-width: 250px;
    }
    &__title {
      color: white;
      font-size: var(--font-size-lg);
      font-weight: bold;
      text-transform: capitalize;
    }
  }
}
</style>
