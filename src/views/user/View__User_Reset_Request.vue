<template>
  <div>
    <base-title>Richiesta di reset della password</base-title>
    <user-reset-request-form
      :initial-values="initialValues"
      :result-is-ready="resultIsReady"
      @on-submit-form="onResetPassword"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/store__user";
import UserResetRequestForm from "./Form__User_Reset_Request.vue";

const initialValues = {
  email: import.meta.env.VITE_ADMIN_EMAIL || "",
};

const router = useRouter();

const userStore = useUserStore();

const resultIsReady = ref(false);

const onResetPassword = async ({ formData: { email }, setErrors }) => {
  try {
    resultIsReady.value = false;
    await userStore.passwordResetRequest(email);
    router.push({ name: "route-main" });
  } catch (error) {
    setErrors(error);
  } finally {
    resultIsReady.value = true;
  }
};
</script>
