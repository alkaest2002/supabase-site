<template>
  <Form
    v-slot="{ errors, isSubmitting, values: { gdpr } }"
    :initial-values="initialValues"
    :validation-schema="validationSchema"
    @submit="onSubmitForm"
    @invalid-submit="isLoading = false"
  >
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <Field
          name="email"
          type="text"
          placeholder="inserisci email"
          class="input"
          :class="{ 'is-danger': errors.email }"
        />
        <div class="has-text-danger">
          {{ errors.email }}
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <Field
          name="password"
          type="password"
          placeholder="inserisci password (almeno 6 caratteri)"
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
    <div class="field mt-5">
      <Field v-slot="{ field }" name="gdpr" type="checkbox" :value="true">
        <label class="has-text-grey">
          <input type="checkbox" name="gdpr" v-bind="field" :value="true" />
          acconsento al trattamento dei miei dati personali.
        </label>
      </Field>
    </div>
    <div class="control mt-5">
      <base-loading-button
        v-model="isLoading"
        type="submit"
        :button-css="'is-medium is-info'"
        :disabled="isSubmitting || !gdpr"
      >
        registrati
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
  email: string()
    .email("L'email non è valida")
    .required("L'email è obbligatoria"),
  password: string()
    .min(6, "La password deve essere lunga almeno 6 caratteri")
    .required("La è password obbligatoria"),
  passwordConfirmation: string()
    .required("La conferma della password è obbligatoria")
    .oneOf([yupRef("password")], "Le password devono corrispondere"),
  gdpr: boolean().required(),
});

const { isLoading, onSubmitForm } = initForm(props, emit);
</script>
