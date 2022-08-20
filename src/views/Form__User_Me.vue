<template>
  <Form
    v-slot="{ errors, isSubmitting }"
    :initial-values="initialValues"
    :validation-schema="validationSchema"
    @submit="onSubmitForm"
    @invalid-submit="isLoading = false"
  >
    <div class="field">
      <label class="label">Nome</label>
      <div class="control">
        <Field
          name="first_name"
          type="text"
          placeholder="Giuseppe"
          class="input"
          :class="{ 'is-danger': errors.first_name }"
        />
        <div class="has-text-danger">
          {{ errors.first_name }}
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">Cognome</label>
      <div class="control">
        <Field
          name="last_name"
          type="text"
          class="input"
          :class="{ 'is-danger': errors.last_name }"
          placeholder="Verdi"
        />
        <div class="has-text-danger">
          {{ errors.last_name }}
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <Field
          name="email"
          type="text"
          placeholder="g.verdi@gmail.com"
          class="input"
          :class="{ 'is-danger': errors.email }"
        />
        <div class="has-text-danger">
          {{ errors.email }}
        </div>
      </div>
    </div>
    <div id="password-box" class="box mt-5 p-5">
      <p class="mb-4">
        <b>Attenzione</b>: completa questi campi solo se vuoi modificare la
        password.
      </p>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <Field
            name="password"
            type="password"
            placeholder="password di Giuseppe Verdi"
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
            placeholder="conferma password di Giuseppe Verdi"
            class="input"
            :class="{ 'is-danger': errors.passwordConfirmation }"
          />
          <div class="has-text-danger">
            {{ errors.passwordConfirmation }}
          </div>
        </div>
      </div>
    </div>
    <div class="control mt-5 buttons are-medium">
      <base-loading-button
        v-model="isLoading"
        type="submit"
        :button-css="'is-info'"
        :disabled="isSubmitting"
      >
        Aggiorna i tuoi dati
      </base-loading-button>
      <button class="button is-danger" type="reset">Reset</button>
    </div>
    <div v-if="errors.apiError" class="has-text-danger mt-3 mb-0">
      {{ errors.apiError }}
    </div>
  </Form>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { Form, Field } from "vee-validate";
import { object, string, ref as yupRef } from "yup";
import { initForm } from "../composables/composables__form";

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
  first_name: string(),
  last_name: string(),
  email: string()
    .email("L'email non è valida")
    .required("L'email è obbligatoria"),
  password: string().min(6, "La password deve essere lunga almeno 6 caratteri"),
  passwordConfirmation: string().oneOf(
    [yupRef("password")],
    "Le password devono corrispondere"
  ),
});

const { isLoading } = initForm(props, emit);

const onSubmitForm = async (formData, { setErrors }) => {
  if (formData?.password?.length > 0 && !formData?.passwordConfirmation) {
    isLoading.value = false;
    return setErrors({
      passwordConfirmation: "Le password devono corrispondere",
    });
  }
  emit("on-submit-form", { formData, setErrors });
};
</script>

<style scoped lang="scss">
#password-box {
  background-color: #f0f0f0;
}
</style>
