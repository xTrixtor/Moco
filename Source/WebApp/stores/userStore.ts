import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";
import { MocoApiEndpointsUserLoginRequest } from "./apiClient";

export const useUserStore = defineStore("user", {
  state: () => {
    const authToken = "";
    const expireTime = "";
    const logoutInterval = 30 * 60;
    let logoutTimer = logoutInterval;
    return {
      authToken,
      logoutInterval,
      logoutTimer,
      expireTime,
    };
  },
  actions: {
    setAuthToken(authToken: string) {
      this.authToken = authToken;
    },
    logout() {
      this.authToken = "";
      sessionStorage.setItem("authToken", "");
      this.logoutTimer = 0;
    },
    async login(
      credentials: MocoApiEndpointsUserLoginRequest
    ): Promise<boolean> {
      const apiStore = useApiStore();

      try {
        const result =
          await apiStore.LoginClient.mocoApiEndpointsUserLoginUserEndpoint(
            credentials
          );
        if (result.jwtToken) {
          this.authToken = result.jwtToken;
          sessionStorage.setItem("authToken", result.jwtToken);
          this.logoutTimer = this.logoutInterval;
        }

        const timer = setInterval(() => {
          if (this.logoutTimer === 0) {
            useUserStore().logout();
            clearInterval(timer);
            this.logoutTimer = this.logoutInterval;
          } else {
            this.logoutTimer--;
          }
        }, 1000);

        return true;
      } catch (e) {
        return false;
      }
    },
    validate() {
      var sessionToken = sessionStorage.getItem("authToken");
      if (sessionToken) this.authToken = sessionToken;
      else sessionStorage.setItem("authToken", "");
    },
  },
  getters: {
    isAuthenticated(): boolean {
      return Boolean(this.authToken);
    },
    getAuthToken(): string {
      return this.authToken;
    },
  },
});
