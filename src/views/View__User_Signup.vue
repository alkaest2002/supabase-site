<template>
  <div>
    <base-title>Modulo di registrazione</base-title>
    <signup-form
      :initial-values="initialValues"
      :result-is-ready="resultIsReady"
      @on-submit-form="onSignup"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/store__users";
import SignupForm from "./Form__User_Signup.vue";

const router = useRouter();

const userStore = useUserStore();

const resultIsReady = ref(false);

const initialValues = {
  email: "",
  password: "",
  passwordConfirmation: "",
  gdpr: false,
};

const onSignup = async ({ formData: { email, password }, setErrors }) => {
  try {
    resultIsReady.value = false;
    await userStore.signup(email, password);
    router.push({ name: "route-user-confirm" });
  } catch (error) {
    setErrors(error);
  } finally {
    resultIsReady.value = true;
  }
};
</script>
