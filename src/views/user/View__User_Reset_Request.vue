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
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/store__user";
import UserResetRequestForm from "./Form__User_Reset_Request.vue";

const initialValues = {
  email: import.meta.env.VITE_ADMIN_EMAIL || "",
};

const router = useRouter();

const toast = useToast();

const userStore = useUserStore();

const resultIsReady = ref(false);

const onResetPassword = async ({ formData: { email } }) => {
  try {
    resultIsReady.value = false;
    await userStore.passwordResetRequest(email);
    router.push({ name: "route-main" });
  } catch ({ apiError }) {
    toast.error(apiError);
  } finally {
    resultIsReady.value = true;
  }
};
</script>
