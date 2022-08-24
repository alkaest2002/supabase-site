<template>
  <div>
    <base-title>Modulo di login</base-title>
    <signin-form
      :initial-values="initialValues"
      :result-is-ready="resultIsReady"
      @on-submit-form="onSignin"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/store__user";
import SigninForm from "./Form__User_Signin.vue";

const initialValues = {
  email: import.meta.env.VITE_ADMIN_EMAIL || "",
  password: import.meta.env.VITE_ADMIN_PASSWORD || "",
};

const router = useRouter();

const route = useRoute();

const toast = useToast();

const userStore = useUserStore();

const resultIsReady = ref(false);

const onSignin = async ({ formData: { email, password }}) => {
  try {
    resultIsReady.value = false;
    await userStore.signin(email, password);
    router.push({ path: route.query.redirect || "/", query: { toastMessage: "login effettuato" }});
  } catch ({ apiError }) {
    toast.error(apiError);
  } finally {
    resultIsReady.value = true;
  }
};
</script>
