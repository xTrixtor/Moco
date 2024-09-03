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
  IBudgetClient,
  BudgetClient,
  FixedcostClient,
  IFixedcostClient,
  GroupcostClient,
  IGroupcostClient,
  IInspectionClient,
  InspectionClient,
  SavinggoalsClient,
  ISavinggoalsClient,
  ICreditClient,
  CreditClient,
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
    BudgetClient(): IBudgetClient {
      return new BudgetClient();
    },
    ChargeClient(): IChargeClient {
      return new ChargeClient();
    },
    RefreshClient(): IRefreshClient {
      return new RefreshClient();
    },
    FixedcostClient(): IFixedcostClient {
      return new FixedcostClient();
    },
    GroupcostClient(): IGroupcostClient {
      return new GroupcostClient();
    },
    InspectionClient(): IInspectionClient {
      return new InspectionClient();
    },
    SavingGoalsClient(): ISavinggoalsClient {
      return new SavinggoalsClient();
    },
    CreditClient(): ICreditClient {
      return new CreditClient();
    },
  },
});
