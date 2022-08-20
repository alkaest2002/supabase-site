import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/pinia__user";
import ViewError from "../views/View__Error.vue";

import mainRoutes from "./router__routes_main";
import userRoutes from "./router__routes_user";

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

router.beforeEach((to, _, next) => {
  const userStore = useUserStore();
  const c1 = to.matched.some((record) => record.meta.requiresAuth);
  const c2 = !userStore.isLoggedIn
  if (c1 && c2) {
    const redirect = to.fullPath.includes("signout")
      ? undefined
      : to.fullPath
    return next({
      name: "route-user-signin",
      query: { redirect },
    });
  }
  return next();
});

export default router;
