import { createRouter, createWebHistory } from "vue-router";
import mainRoutes from "@/pages/main/__routes_main";
import userRoutes from "@/pages/user/__routes_user";
import ViewError from "@/pages/main/View__Error.vue";

const routes = [
  ...mainRoutes,
  ...userRoutes,
  {
    path: "/:catchAll(.*)",
    name: "route-not-found",
    component: ViewError,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  routes,
});



export default router;
