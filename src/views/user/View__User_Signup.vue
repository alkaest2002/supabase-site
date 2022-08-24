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
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/store__user";
import SignupForm from "./Form__User_Signup.vue";

const router = useRouter();

const toast = useToast();

const userStore = useUserStore();

const resultIsReady = ref(false);

const initialValues = {
  email: "",
  password: "",
  passwordConfirmation: "",
  gdpr: false,
};

const onSignup = async ({ formData: { email, password }}) => {
  try {
    resultIsReady.value = false;
    await userStore.signup(email, password);
    router.push({ name: "route-user-verify" });
  }  catch ({ apiError }) {
    toast.error(apiError);
  } finally {
    resultIsReady.value = true;
  }
};
</script>
