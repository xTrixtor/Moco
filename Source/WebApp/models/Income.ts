import type { BaseModel } from "./BaseModel";

export interface Income extends BaseModel {
  name: string;
  amount: number; // in cents
  dateReceived?: string; // ISO 8601 string from PocketBase
}
