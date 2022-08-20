/* eslint-disable no-unused-vars */
import { ref, watch, onMounted } from "vue";
import { configure} from "vee-validate";


export const initForm = (props, emit) =>  {

  configure({
    validateOnBlur: false,
    validateOnChange: true,
    validateOnInput: false,
    validateOnModelUpdate: true,
  });

  const isLoading = ref(false);

  watch(
    () => props.resultIsReady,
    (value) => {
      if (value) isLoading.value = false;
    }
  );

  const onSubmitForm = async (formData, { setErrors }) => {
    emit("on-submit-form", { formData, setErrors });
  };

  onMounted(() => document.getElementsByTagName("input")[0]?.focus());

  return {
    isLoading,
    onSubmitForm
  }
}