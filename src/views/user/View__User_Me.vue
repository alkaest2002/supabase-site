<template>
  <div>
    <base-title>Account personale</base-title>
    <update-user-form
      :initial-values="initialValues"
      :result-is-ready="resultIsReady"
      @on-submit-form="onUserUpdate"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/store__users";
import UpdateUserForm from "./Form__User_Me.vue";

const router = useRouter();

const userStore = useUserStore();

const resultIsReady = ref(false);

const initialValues = computed(() => {
  return userStore.user;
});

const onUserUpdate = async ({ formData, setErrors }) => {
  try {
    resultIsReady.value = false;
    const shouldLogout = await userStore.updateUser(formData);
    if (shouldLogout) router.push({ name: "route-signout" });
  } catch (error) {
    setErrors(error);
  } finally {
    resultIsReady.value = true;
  }
};
</script>
