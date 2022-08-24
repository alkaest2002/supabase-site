<template>
  <Form
    v-slot="{ errors, isSubmitting, values: { email, password } }"
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
          class="input"
          placeholder="inserisci email"
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
          class="input"
          placeholder="inserisci password (almeno 6 caratteri)"
          :class="{ 'is-danger': errors.password }"
        />
        <div class="has-text-danger">
          {{ errors.password }}
        </div>
      </div>
    </div>
    <div class="control mt-5">
      <base-loading-button
        v-model="isLoading"
        :type="'submit'"
        :button-css="'is-medium is-info'"
        :disabled="isSubmitting || !(email && password)"
      >
        entra
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
import { object, string } from "yup";
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
  "on-submit-form": (value) => {
    const c1 = Object.keys(value).every((key) =>
      ["formData", "setErrors"].includes(key)
    );
    const c2 = Object.keys(value.formData).every((key) =>
      ["email", "password"].includes(key)
    );
    return c1 && c2;
  },
});

const { isLoading, onSubmitForm } = initForm(props, emit);

const validationSchema = object().shape({
  email: string().email("email non valida").required("email richiesta"),
  password: string()
    .min(6, "La password deve essere lunga almeno 6 caratteri")
    .required("password richiesta"),
});
</script>
