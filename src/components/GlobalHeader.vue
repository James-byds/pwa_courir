<script setup>
import MainNav from '@/components/sub_components/MainNav.vue'
import UserLogin from '@/components/sub_components/UserLogin.vue'
</script>

<template>
  <header class="global-header">
    <section class="global-header__user">
      <div class="global-header__user__title">
        <img src="@/assets/img/logo.png" alt="logo" class="global-header__user__title__img"/>
        <h1 class="global-header__user__title__text">Je cours pour ma forme</h1>
      </div>
      <UserLogin />
    </section>
    <MainNav />
  </header>
</template>

<style scoped lang="scss">
.global-header {
  background-color: #555; //integrer les couleurs de la MC
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  &__user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    &__title {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: center;
      &__img {
        color: white;
        margin: 0 1rem 0 0;
        min-width: 50px;
        aspect-ratio: 1/1;
        max-width: 150px;
      }
      &__text {
        color: white;
        font-size: var(--font-size-lg);
        font-weight: bold;
      }
    }
  }
}
</style>
