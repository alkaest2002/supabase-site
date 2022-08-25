<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="container is-max-widescreen">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="{ name: 'route-home' }">
          <span class="is-size-3 has-text-weight-bold">SITE</span>
        </router-link>
        <a
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': burgerIsActive }"
          @click="burgerIsActive = !burgerIsActive"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbarBase"
        class="navbar-menu"
        :class="{ 'is-active': burgerIsActive }"
      >
        <div class="navbar-start">
          <router-link class="navbar-item" :to="{ name: 'route-blog-list' }">
            blog
          </router-link>
          <router-link class="navbar-item" :to="{ name: 'route-about' }">
            about
          </router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <component :is="authComponent" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/store__user";
import NavigatioSignedIn from "./Base__Navigation_SignedIn.vue";
import NavigationNotSignedIn from "./Base__Navigation_NotSignedIn.vue";

const userStore = useUserStore();

const burgerIsActive = ref(false);

const authComponent = computed(() => {
  return userStore.isLoggedIn ? NavigatioSignedIn : NavigationNotSignedIn;
});
</script>
