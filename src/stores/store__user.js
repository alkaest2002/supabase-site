import { defineStore } from "pinia";
import { supabase } from "@/services/service__supabase";

const handleApiError = (error) => {
  return Promise.reject({
    apiError: error.error_description || error.message || "generic error",
  });
};

export const useUserStore = defineStore({
  id: "store-user",

  persist: true,

  state() {
    return {
      userProfile: null,
      session: null,
      lastAuthEvent: null,
    };
  },

  getters: {
    user() {
      return {
        id: this.session?.user?.id,
        email: this.session?.user?.email,
        ...this.userProfile,
      };
    },

    isLoggedIn() {
      return [
        this.session != null,
        !Object.keys(this.session || {}).includes("provider_token"),
        this.lastAuthEvent === "SIGNED_IN"
      ].every(Boolean) ;
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
        const { data: { session }, error: errorWhileSignin } =
          await supabase.auth.signInWithPassword({ email, password });
        if (errorWhileSignin) throw errorWhileSignin;
        this.session = session;
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

    async passwordResetRequest(email) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email)
        this.resetAccessToken = null;
        if (error) throw error;
        return Promise.resolve(true);
      } catch (error) {
        return handleApiError(error);
      }
    },

    async passwordResetUpdate(password) {
      try {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        return this.signout();
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
