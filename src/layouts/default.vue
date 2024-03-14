<template>
  <!-- <router-view v-slot="{ Component, route }">
    <transition>
      <component :is="Component" :key="route" />
    </transition>
  </router-view> -->
  <Header />
  <RouterView />
  <BackToTop />
  <Footer />
</template>