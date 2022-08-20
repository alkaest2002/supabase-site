import { defineStore } from "pinia";
import { supabase } from "../services/service__supabase";

const handleApiError = (error) => {
  return Promise.reject({
    apiError: error.error_description || error.message || "generic error",
  });
};

supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session)
})

export const useUserStore = defineStore({
  id: "auth",

  persist: true,

  state() {
    return {
      user: null,
      userProfile: null,
      session: null,
    };
  },

  getters: {
    isLoggedIn() {
      return this.session != null;
    },
  },

  actions: {
    async signup(email, password) {
      try {
        const {
          data: { user, session },
          error: errorWhenSignup,
        } = await supabase.auth.signUp({ email, password });
        if (errorWhenSignup) throw errorWhenSignup;
        this.user = user;
        this.session = session;
      } catch (error) {
        return handleApiError(error);
      }
    },

    async signin(email, password) {
      try {
        const {
          data: { user, session },
          error: errorWhenSignin,
        } = await supabase.auth.signInWithPassword({ email, password });
        if (errorWhenSignin) throw errorWhenSignin;
        this.user = user;
        this.session = session;
        const { data, error: errorWhenFetchingUserProfile } = await supabase
          .from("profiles")
          .select();
        if (errorWhenFetchingUserProfile) throw errorWhenFetchingUserProfile;
        this.userProfile = data[0];
        return Promise.resolve(true);
      } catch (error) {
        return handleApiError(error);
      }
    },

    async updateUser(payload) {
      const { first_name, last_name, email, password, gdpr } = payload;
      const userProfileData = { id: this.user.id, first_name, last_name, gdpr };
      const userData = { email, password };
      if (userData.email == this.user.email) delete userData.email;
      if (!userData.password) delete userData.password;
      try {
        if (Object.keys(userData).length > 0) {
          const {
            data: { user, session },
            error: errorWhenUpdatingUser,
          } = await supabase.auth.updateUser(userData);
          if (errorWhenUpdatingUser) throw errorWhenUpdatingUser;
          this.user = user;
          this.session = session;
        }
        const { error: errorWhenUpdatingUserProfile } = await supabase
          .from("profiles")
          .upsert(userProfileData);
        if (errorWhenUpdatingUserProfile) throw errorWhenUpdatingUserProfile;
        this.userProfile = userProfileData;
        if (Object.keys(userData).length > 0)
          return this.signout();
        return Promise.resolve(false);
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
