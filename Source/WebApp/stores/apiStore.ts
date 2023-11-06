import { defineStore } from "pinia";
import {
  UserClient,
  IUserClient,
  RevenueClient,
  IRevenueClient,
  ChargeClient,
  IChargeClient,
  ILoginClient,
  LoginClient,
  RefreshClient,
  IRefreshClient,
} from "./apiClient";

export const useApiStore = defineStore("api", {
  getters: {
    LoginClient(): ILoginClient {
      return new LoginClient();
    },
    UserClient(): IUserClient {
      return new UserClient();
    },
    RevenueClient(): IRevenueClient {
      return new RevenueClient();
    },
    ChargeClient(): IChargeClient {
      return new ChargeClient();
    },
    RefreshClient(): IRefreshClient {
      return new RefreshClient();
    },
  },
});
