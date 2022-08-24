<template>
  <div class="navbar-item">
    <div class="buttons">
      <router-link
        class="button is-light"
        :to="{ name: 'route-user-me' }"
      >
        area personale
      </router-link>
      <button
        class="button is-primary"
        :class="{'is-loading': isLoading}"
        @click="onClickSignout"
      >
        esci
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const isLoading = ref(false);

const onClickSignout = () => {
  isLoading.value = true;
  router.push({ name: 'route-user-signout' });
};
</script>
