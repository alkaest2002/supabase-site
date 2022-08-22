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
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/store__user";
import { supabase } from "@/services/service__supabase";

const userStore = useUserStore();

const route = useRoute();

supabase.auth.onAuthStateChange((event, session) => {
  if (event === "PASSWORD_RECOVERY") {
    userStore.resetAccessToken = route.query.access_token;
  } else {
    userStore.session = session;
  }
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
