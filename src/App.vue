<template>
  <router-view v-slot="{ Component }">
    <base-layout>
      <transition name="fade" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </base-layout>
  </router-view>
</template>

<style>
*:focus {
  outline: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transition: opacity 0, 0.1s;
}
</style>
