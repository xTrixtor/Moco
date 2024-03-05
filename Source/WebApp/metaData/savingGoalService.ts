import { addMonths, getDate, getMonth, getYear } from "date-fns";
import { DepositRateDto } from "~/stores/apiClient";

export const calculateDepositsWithMonthlyRate = (
  rate: number,
  goalValue: number,
  initialCapital: number
): DepositRateDto[] => {
  let goalCopy = goalValue - initialCapital;
  const depositRateNumber = goalCopy / rate;
  let capital = initialCapital;

  const today = new Date();

  const depositRates: DepositRateDto[] = [];

  for (let i = 1; i <= depositRateNumber; i++) {
    const monthOfSaving = addMonths(today, i);
    const key = `${getMonth(monthOfSaving)}-${getYear(monthOfSaving)}`;
    capital += rate;
    const depositRate: DepositRateDto = {
      key: key,
      value: capital,
      savingMonth: monthOfSaving,
    };
    depositRates.push(depositRate);
    goalCopy = goalCopy - rate;
  }

  if (goalCopy % rate != 0) {
    const lastSavingMonth = addMonths(today, useCeil(depositRateNumber));
    const key = `${getMonth(lastSavingMonth)}-${getYear(lastSavingMonth)}`;
    const depositRate: DepositRateDto = {
      key: key,
      value: goalValue,
      savingMonth: lastSavingMonth,
    };
    depositRates.push(depositRate);
  }
  return depositRates;
};

export const calculateDepositsWithDate = () => {};

export const ConvertKeyIntoDate = (key: string): Date => {
  const parts = key.split("-");
  const month = +parts[0];
  const year = +parts[1];
  return new Date(year, month, 1);
};

export const GetKeyFromDate = (date: Date): string => {
  const month = getMonth(date);
  const year = getYear(date);

  return `${month}-${year}`;
};
