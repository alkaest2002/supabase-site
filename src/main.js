import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./routes/router";
import BaseLayout from "./views/Base__Layout.vue";
import BaseTitle from "./views/Base__Title.vue";
import BaseLoadingButton from "./views/Base__Loading_Button.vue";
import BaseNavigation from "./views/Base__Navigation.vue";

import "vue-toastification/dist/index.css";
import "../node_modules/bulma/css/bulma.css";

const app = createApp(App);

const pinia = createPinia().use(piniaPluginPersistedstate);

app
  .component("BaseLayout", BaseLayout)
  .component("BaseLoadingButton", BaseLoadingButton)
  .component("BaseTitle", BaseTitle)
  .component("BaseNavigation", BaseNavigation)
  .use(pinia)
  .use(router)
  .use(Toast, {
    timeout: 1850,
    position: "top-center",
    maxToasts: 5,
  })
  .mount("#app");
