<template>
  <Form
    v-slot="{ errors, isSubmitting }"
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
          type="email"
          placeholder="email"
          class="input"
          :class="{ 'is-danger': errors.email }"
        />
        <div class="has-text-danger">
          {{ errors.email }}
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
        richiedi email di reset
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
  email: string().email("email non valida").required("email richiesta"),
});

const { isLoading, onSubmitForm } = initForm(props, emit);
</script>
