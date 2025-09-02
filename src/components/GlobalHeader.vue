<script setup>
import MainNav from '@/components/sub_components/MainNav.vue'
import UserLogin from '@/components/sub_components/UserLogin.vue'
</script>

<template>
  <header class="global-header">
    <section class="global-header__user">
      <h1 class="global-header__user__title">My App</h1>
      <UserLogin />
    </section>
    <MainNav />
  </header>
</template>

<style scoped lang="scss">
.global-header {
  background-color: #333;
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
      color: white;
      margin: 0 1rem 0 0;
      font-size: var(--font-size-xl);
      text-align: center;
    }
  }
}
</style>
