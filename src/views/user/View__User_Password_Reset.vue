<template>
  <div>
    <base-title>Reset Password</base-title>
    <password-reset-form
      :initial-values="initialValues"
      :result-is-ready="resultIsReady"
      @on-submit-form="onResetPassword"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/store__users";
import PasswordResetForm from "./Form__User_Password_reset.vue";

const initialValues = {
  email: import.meta.env.VITE_ADMIN_EMAIL || "",
  password: import.meta.env.VITE_ADMIN_PASSWORD || "",
};

const router = useRouter();

const userStore = useUserStore();

const resultIsReady = ref(false);

const onResetPassword = async ({ formData: { password }, setErrors }) => {
  try {
    resultIsReady.value = false;
    await userStore.passwordReset(password);
    router.push({ path: "route-home" });
  } catch (error) {
    setErrors(error);
  } finally {
    resultIsReady.value = true;
  }
};
</script>
