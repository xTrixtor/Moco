import type { FixedCost } from "./FixedCost";
import type { Budget } from "./Budget";
import type { Charge } from "./Charge";
import type { BaseModel } from "./BaseModel";

export interface MonthlyInspection extends BaseModel {
  month: number;
  year: number;
  totalIncome: number;
  fixedCostsChecklist: {
    fixedCost: FixedCost;
    isChecked: boolean;
  }[];
  budgets: {
    budget: Budget;
    charges: Charge[];
  }[];
}
