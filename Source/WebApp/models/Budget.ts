import type { BaseModel } from "./BaseModel";

export interface Budget extends BaseModel {
  name: string;
  limit: number; // in cents
}
