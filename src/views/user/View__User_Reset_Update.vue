<template>
  <div>
    <base-title>Reset Password</base-title>
    <user-reset-update-form
      :initial-values="initialValues"
      :result-is-ready="resultIsReady"
      @on-submit-form="onResetPassword"
    />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/store__user";
import userResetUpdateForm from "./Form__User_Reset_Update.vue";

const initialValues = {
  password: "",
  passwordConfirmation: "",
};

const router = useRouter();

const toast = useToast();

const userStore = useUserStore();

const resultIsReady = ref(false);

const onResetPassword = async ({ formData: { password } }) => {
  try {
    resultIsReady.value = false;
    await userStore.passwordResetUpdate(password);
    router.push({ name: "route-user-signin" });
  } catch ({ apiError }) {
    toast.error(apiError);
  } finally {
    resultIsReady.value = true;
  }
};

onBeforeMount(() => {
  if (router.currentRoute.value.hash.includes("error"))
    router.push({ name: "route-home" });
});
</script>
