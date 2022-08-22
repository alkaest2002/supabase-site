import { useUserStore } from "../stores/store__users";
import ViewUserSignup from "@/views/user/View__User_Signup.vue";
import ViewUserSignin from "@/views/user/View__User_Signin.vue";
import ViewUserMe from "@/views/user/View__User_Me.vue";
import ViewUserVerifydEmail from "@/views/user/View__User_Verify_Email.vue";
import ViewUserVerifiedEmail from "@/views/user/View__User_Verified_Email.vue";
import ViewUserPasswordReset from "@/views/user/View__User_Password_Reset.vue";

const isNotLoggedin = () => {
  const userStore = useUserStore();
  return !userStore.isLoggedIn;
};

export default [
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
        return { name: "route-user-signin" };
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
    path: "/user/confirm",
    name: "route-user-confirm",
    component: ViewUserVerifydEmail,
    beforeEnter: () => isNotLoggedin(),
  },
  {
    path: "/user/confirmed",
    name: "route-user-confirmed",
    component: ViewUserVerifiedEmail,
    beforeEnter: () => isNotLoggedin(),
  },
  {
    path: "/user/password-reset",
    name: "route-user-password-reset",
    component: ViewUserPasswordReset,
    beforeEnter: () => {
      const userStore = useUserStore();
      return userStore.resetAccessToken != null;
    },
  },
];
