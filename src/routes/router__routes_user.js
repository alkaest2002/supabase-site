import { useUserStore } from "@/stores/store__user";
import ViewUserSignup from "@/views/user/View__User_Signup.vue";
import ViewUserVerify from "@/views/user/View__User_Verify.vue";
import ViewUserVerified from "@/views/user/View__User_Verified.vue";
import ViewUserSignin from "@/views/user/View__User_Signin.vue";
import ViewUserMe from "@/views/user/View__User_Me.vue";
import ViewUserResetRequest from "@/views/user/View__User_Reset_Request.vue";
import ViewUserResetUpdate from "@/views/user/View__User_Reset_Update.vue";

const isNotLoggedin = () => {
  const userStore = useUserStore();
  return !userStore.isLoggedIn;
};

export default [
  {
    path: "/user/verify",
    name: "route-user-verify",
    component: ViewUserVerify,
    beforeEnter: () => isNotLoggedin(),
  },
  {
    path: "/user/verified",
    name: "route-user-verified",
    component: ViewUserVerified,
    beforeEnter: () => isNotLoggedin(),
  },
  {
    path: "/user/signin",
    name: "route-user-signin",
    component: ViewUserSignin,
    beforeEnter: () => isNotLoggedin(),
  },
  {
    path: "/user/signout",
    name: "route-user-signout",
    beforeEnter: async () => {
      const userStore = useUserStore();
      try {
        await userStore.signout();
        return { name: "route-home", query: { toastMessage: "logout effettuato" }};
      } catch (err) {
        return false;
      }
    },
    meta: { requiresAuth: true },
  },
  {
    path: "/user/me",
    name: "route-user-me",
    component: ViewUserMe,
    meta: { requiresAuth: true },
  },
  {
    path: "/user/signup",
    name: "route-user-signup",
    component: ViewUserSignup,
    beforeEnter: () => isNotLoggedin(),
  },
  {
    path: "/user/password-reset-request",
    name: "route-user-password-reset-request",
    component: ViewUserResetRequest,
    beforeEnter: () => isNotLoggedin(),
  },
  {
    path: "/user/password-reset-update",
    name: "route-user-password-reset-update",
    component: ViewUserResetUpdate,
    beforeEnter: () => isNotLoggedin(),
  },
];
