<template>
  <div class="mb-6">
    <router-link class="is-size-4 has-text-dark" :to="{ name: goTo }">
      <slot />
    </router-link>
  </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
const props = defineProps({
  goTo: {
    type: String,
    default: "route-home",
  },
});
</script>
