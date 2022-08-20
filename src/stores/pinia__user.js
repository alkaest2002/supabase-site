import { defineStore } from "pinia";
import { supabase } from "../services/service__supabase";

const handleApiError = (error) => {
  return Promise.reject({
    apiError: error.error_description || error.message || "generic error",
  });
};

supabase.auth.onAuthStateChange((event, session) => {
  console.log(event);
  const userStore = useUserStore();
  userStore.session = session
})

export const useUserStore = defineStore({
  id: "auth",

  persist: true,

  state() {
    return {
      userProfile: null,
      session: null,
    };
  },

  getters: {
    user() {
      return {
        user: this.session?.user?.email,
        ...this.userProfile
      }
    },
    
    isLoggedIn() {
      return this.session != null;
    },
  },

  actions: {
    async signup(email, password) {
      try {
        const { error: errorWhenSignup } = await supabase.auth.signUp({ email, password });
        if (errorWhenSignup) throw errorWhenSignup;
      } catch (error) {
        return handleApiError(error);
      }
    },

    async signin(email, password) {
      try {
        const { error: errorWhenSignin } = await supabase.auth.signInWithPassword({ email, password });
        if (errorWhenSignin) throw errorWhenSignin;
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
      const { first_name, last_name, email, password } = payload;
      const userProfileData = { id: this.user.id, first_name, last_name };
      const userAuth = { email, password };
      if (userAuth.email == this.user.email) delete userAuth.email;
      if (!userAuth.password) delete userAuth.password;
      try {
        if (Object.keys(userAuth).length > 0) {
          const { error: errorWhenUpdatingUser } = await supabase.auth.updateUser(userAuth);
          if (errorWhenUpdatingUser) throw errorWhenUpdatingUser;
        }
        const { error: errorWhenUpdatingUserProfile } = await supabase
          .from("profiles")
          .upsert(userProfileData);
        if (errorWhenUpdatingUserProfile) throw errorWhenUpdatingUserProfile;
        this.userProfile = userProfileData;
        if (Object.keys(userAuth).length > 0)
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
