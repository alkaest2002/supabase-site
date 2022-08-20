<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="container is-max-widescreen">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="{ name: 'route-home' }">
          <span class="is-size-3 has-text-weight-bold">SITE</span>
        </router-link>
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBase" class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" :to="{ name: 'route-home' }">
            home
          </router-link>
          <router-link
            v-if="isLoggedIn"
            class="navbar-item"
            :to="{ name: 'route-user-me' }"
          >
            area personale
          </router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <div v-if="isLoggedIn">
                <router-link
                  class="button is-primary"
                  :to="{ name: 'route-user-signout' }"
                >
                  esci
                </router-link>
              </div>
              <div v-else>
                <router-link
                  class="button is-light"
                  :to="{ name: 'route-user-signin' }"
                >
                  entra
                </router-link>
                <router-link
                  class="button is-primary"
                  :to="{ name: 'route-user-signup' }"
                >
                  registrati
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "../stores/pinia__user";

const userStore = useUserStore();

const isLoggedIn = computed(() => userStore.isLoggedIn);
</script>
