import type { BaseModel } from "./BaseModel";

export interface Charge extends BaseModel {
  budgetId: string;
  name: string;
  amount: number; // in cents
  date: string; // ISO 8601 string from PocketBase (e.g. "2022-01-01 10:00:00.123Z")
}
