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
          :class="{'is-active': burgerIsActive}"
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
        :class="{'is-active': burgerIsActive}"
      >
        <div class="navbar-start">
          <router-link
            class="navbar-item"
            :to="{ name: 'route-blog-list' }"
          >
            blog
          </router-link>
           <router-link
            class="navbar-item"
            :to="{ name: 'route-about' }"
          >
            about
          </router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <div v-if="isLoggedIn">
               <template v-if="isLoggedIn">
                <router-link
                  class="button is-light"
                  :to="{ name: 'route-user-me' }"
                >
                  area personale
                </router-link>
              </template>
                <button
                  class="button is-primary"
                  :class="{'is-loading': isLoading}"
                  @click="onClickSignout"
                >
                  esci
                </button>
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/store__user";

const userStore = useUserStore();

const router = useRouter();

const burgerIsActive = ref(false);

const isLoading = ref(false);

const isLoggedIn = computed(() => userStore.isLoggedIn);

const onClickSignout = () => {
  isLoading.value = true;
  router.push({ name: 'route-user-signout' });
  isLoading.value = false;
}
</script>
