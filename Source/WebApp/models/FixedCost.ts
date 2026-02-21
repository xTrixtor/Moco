import type { TimeInterval } from "./TimeInterval";
import type { BaseModel } from "./BaseModel";

export interface FixedCost extends BaseModel {
  name: string;
  amount: number; // in cents
  billingInterval: TimeInterval;
  dueDate: number; // Day of the month
}
