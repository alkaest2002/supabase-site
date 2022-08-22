import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import { supabase } from "@/services/service__supabase";

const handleApiError = (error) => {
  return Promise.reject({
    apiError: error.error_description || error.message || "generic error",
  });
};

supabase.auth.onAuthStateChange((event, session) => {
  const userStore = useUserStore();
  const route = useRoute();
  if (event === "PASSWORD_RECOVERY") {
    userStore.resetAccessToken = route.query.access_token;
  } else {
    userStore.session = session;
  }
});

export const useUserStore = defineStore({
  id: "store-users",

  persist: true,

  state() {
    return {
      userProfile: null,
      session: null,
      resetAccessToken: null
    };
  },

  getters: {
    user() {
      return {
        user: this.session?.user?.email,
        ...this.userProfile,
      };
    },

    isLoggedIn() {
      return this.session != null;
    },
  },

  actions: {
    async signup(email, password) {
      try {
        const { error: errorWhileSignup } = await supabase.auth.signUp({
          email,
          password,
        });
        if (errorWhileSignup) throw errorWhileSignup;
      } catch (error) {
        return handleApiError(error);
      }
    },

    async signin(email, password) {
      try {
        const { error: errorWhileSignin } =
          await supabase.auth.signInWithPassword({ email, password });
        if (errorWhileSignin) throw errorWhileSignin;
        const { data, error: errorWhileFetchingUserProfile } = await supabase
          .from("profiles")
          .select();
        if (errorWhileFetchingUserProfile) throw errorWhileFetchingUserProfile;
        this.userProfile = data[0];
        return Promise.resolve(true);
      } catch (error) {
        return handleApiError(error);
      }
    },

    async updateUser(payload) {
      const { first_name, last_name, email, password } = payload;
      const userProfileData = { id: this.user.id, first_name, last_name };
      const userAuth = { email, password };
      if (userAuth.email == this.user.email) delete userAuth.email;
      if (!userAuth.password) delete userAuth.password;
      try {
        if (Object.keys(userAuth).length > 0) {
          const { error: errorWhileUpdatingUser } =
            await supabase.auth.updateUser(userAuth);
          if (errorWhileUpdatingUser) throw errorWhileUpdatingUser;
        }
        const { error: errorWhileUpdatingUserProfile } = await supabase
          .from("profiles")
          .upsert(userProfileData);
        if (errorWhileUpdatingUserProfile) throw errorWhileUpdatingUserProfile;
        this.userProfile = userProfileData;
        if (Object.keys(userAuth).length > 0) return this.signout();
        return Promise.resolve(false);
      } catch (error) {
        return handleApiError(error);
      }
    },

    async passwordReset(password) {
      try {
        const { error: errorWhilePasswordReset } =
          await supabase.auth.updateUser(this.resetAccessToken, { password });
        this.resetAccessToken = null;
        if (errorWhilePasswordReset) throw errorWhilePasswordReset;
        return Promise.resolve(true);
      } catch (error) {
        return handleApiError(error);
      }
    },

    async signout() {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        this.$reset();
        return Promise.resolve(true);
      } catch (error) {
        return handleApiError(error);
      }
    },
  },
});
