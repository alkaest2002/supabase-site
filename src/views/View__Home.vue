<template>
  <base-title>Home</base-title>
</template>

<script setup>
import { watch } from "vue"
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";

const route = useRoute();

const toastTypes = [
  "success",
  "info",
  "warning",
  "error" 
]; 

const toast = useToast(); 

watch(() => route.query, ({ toastMessage, toastType }) => {
  if (toastMessage) {
    if (toastType && toastTypes.includes(toastType)) {
      return toast[toastType](toastMessage);
    }
    toast(toastMessage);
  }
}, { immediate: true })

</script>
