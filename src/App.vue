<template>
  <router-view v-slot="{ Component }">
    <base-layout>
      <transition name="fade" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </base-layout>
  </router-view>
</template>

<script setup>
import { useUserStore } from "@/stores/store__user";
import { supabase } from "@/services/service__supabase";

const userStore = useUserStore();

supabase.auth.onAuthStateChange((event, session) => {
  userStore.$patch({
    session,
    lastAuthEvent: event
  });
});
</script>

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
