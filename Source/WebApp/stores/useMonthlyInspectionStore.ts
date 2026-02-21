import { defineStore } from "pinia";
import { useBaseStore, pb } from "./useBaseStore";
import type { MonthlyInspection } from "~/models";

export type { MonthlyInspection }; // Explicitly export to fix Pinia/Volar "Cannot find name" inference error when spreading generics

export const useMonthlyInspectionStore = defineStore(
  "monthlyInspection",
  () => {
    const base = useBaseStore<MonthlyInspection>("monthly_inspections");

    const getInspectionByDate = async (month: number, year: number) => {
      try {
        const record = await pb
          .collection("monthly_inspections")
          .getFirstListItem<MonthlyInspection>(
            `month = ${month} && year = ${year}`,
          );
        return record;
      } catch (e) {
        return null;
      }
    };

    return {
      ...base,
      getInspectionByDate,
    };
  },
);
