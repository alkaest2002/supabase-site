<template>
  <div>
    <base-title>Modulo di login</base-title>
    <signin-form
      :initial-values="initialValues"
      :result-is-ready="resultIsReady"
      @on-submit-form="onSignin"
    />
    <div class="mt-3">
      <small>
        <router-link :to="{ name: 'route-user-password-reset-request'}">
          Password dimenticata
        </router-link>
      </small>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/store__user";
import SigninForm from "./Form__User_Signin.vue";

const initialValues = {
  email: import.meta.env.VITE_ADMIN_EMAIL || "",
  password: import.meta.env.VITE_ADMIN_PASSWORD || "",
};

const router = useRouter();

const route = useRoute();

const userStore = useUserStore();

const resultIsReady = ref(false);

const onSignin = async ({ formData: { email, password }, setErrors }) => {
  try {
    resultIsReady.value = false;
    await userStore.signin(email, password);
    router.push({ path: route.query.redirect || "/" });
  } catch (error) {
    setErrors(error);
  } finally {
    resultIsReady.value = true;
  }
};
</script>
