import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";
import { useTimeoutStore } from "./timeOutStore";
import { throwError } from "element-plus/es/utils";
import { LoginRequest, RefreshAuthTokenRequest, UserDto } from "./apiClient";


export const useUserStore = defineStore("user", {
  state: () => {
    const user = {} as UserDto;
    const keycloakId = "";
    const authToken = "";
    const refreshToken = "";

    return {
      user,
      keycloakId, 
      authToken,
      refreshToken,
    };
  },
  actions: {
    setAuthToken(authToken: string) {
      this.authToken = authToken;
    },
    logout() {
      useTimeoutStore().clearTimer();
      this.authToken = "";
      sessionStorage.setItem("authToken", "");
      sessionStorage.setItem("refreshToken", "");
    },
    async login(
      credentials: LoginRequest
    ): Promise<boolean> {
      const apiStore = useApiStore();
      try {
        useTimeoutStore().startTimer();
        const result =
          await apiStore.LoginClient.loginUserEndpoint(
            credentials
          );
        if (result.jwtToken) {
          this.authToken = result.jwtToken;
          sessionStorage.setItem("authToken", result.jwtToken);
        }
        if (result.refreshToken) {
          this.refreshToken = result.refreshToken;
          sessionStorage.setItem("refreshToken", result.refreshToken);
        }
        if(result.user && result.user.keycloakUserId){
          this.user = result.user;
          this.keycloakId = result.user.keycloakUserId;
          sessionStorage.setItem("keycloakId", result.user.keycloakUserId)
        }

        return true;
      } catch (e) {
        useTimeoutStore().clearTimer();
        return false;
      }
    },
    async refreshAuthTokenAsync(refreshToken: string) {
      var request = {
        refreshToken,
      };
      var res =
        await useApiStore().RefreshClient.refreshAuthTokenEndpoint(
          request as RefreshAuthTokenRequest
        );
      if (res === undefined) {
        throwError("Refreshedfaild", "Refreshedfaild");
      }
      this.authToken = res.jwtToken ?? "";
      sessionStorage.setItem("authToken", res.jwtToken);
      this.refreshToken = res.refreshToken ?? "";
      sessionStorage.setItem("refreshToken", res.refreshToken);
      
    },
    async validate() {
      this.keycloakId = sessionStorage.getItem("keycloakId");
      this.refreshToken = sessionStorage.getItem("refreshToken") ?? "";
      if (this.refreshToken) {
        await this.refreshAuthTokenAsync(this.refreshToken);
      }
      var sessionToken = sessionStorage.getItem("authToken");
      if (sessionToken) {
        this.authToken = sessionToken;
        useTimeoutStore().clearTimer();
        useTimeoutStore().startTimer();
      } else {
        sessionStorage.setItem("authToken", "");
      }
    },
  },
  getters: {
    isAuthenticated(): boolean {
      return Boolean(this.authToken);
    },
    getAuthToken(): string {
      return this.authToken;
    },
    getUser(): UserDto{
      return this.user;
    },
    getKeycloakId():string{
      return this.keycloakId;
    }
  },
});