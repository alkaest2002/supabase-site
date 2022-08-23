<template>
  <Form
    v-slot="{ errors, isSubmitting }"
    :initial-values="initialValues"
    :validation-schema="validationSchema"
    @submit="onSubmitForm"
    @invalid-submit="isLoading = false"
  >
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <Field
          name="password"
          type="password"
          placeholder="inserisci password"
          class="input"
          :class="{ 'is-danger': errors.password }"
        />
        <div class="has-text-danger">
          {{ errors.password }}
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">Conferma password</label>
      <div class="control">
        <Field
          name="passwordConfirmation"
          type="password"
          placeholder="conferma password"
          class="input"
          :class="{ 'is-danger': errors.passwordConfirmation }"
        />
        <div class="has-text-danger">
          {{ errors.passwordConfirmation }}
        </div>
      </div>
    </div>
    <div class="control mt-5">
      <base-loading-button
        v-model="isLoading"
        type="submit"
        :button-css="'is-medium is-info'"
        :disabled="isSubmitting"
      >
        Aggiorna Password
      </base-loading-button>
    </div>
    <div v-if="errors.apiError" class="has-text-danger mt-3 mb-0">
      {{ errors.apiError }}
    </div>
  </Form>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { Form, Field } from "vee-validate";
import { object, string, boolean, ref as yupRef } from "yup";
import { initForm } from "@/composables/composables__form";

const props = defineProps({
  resultIsReady: {
    type: Boolean,
    default: false,
  },

  initialValues: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits({
  "on-submit-form": null,
});

const validationSchema = object().shape({
  password: string()
    .min(6, "La password deve essere lunga almeno 6 caratteri")
    .required("La è password obbligatoria"),
  passwordConfirmation: string()
    .required("La conferma della password è obbligatoria")
    .oneOf([yupRef("password")], "Le password devono corrispondere"),
});

const { isLoading, onSubmitForm } = initForm(props, emit);
</script>
