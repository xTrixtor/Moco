import {
  addMonths,
  differenceInCalendarMonths,
  getMonth,
  getYear,
  startOfDay,
} from "date-fns";
import { DepositRateDto } from "~/stores/apiClient";

export const savingOptions: { key: number; label: string }[] = [
  { key: 0, label: "Monatliche Raten" },
  { key: 1, label: "Start und End Datum" },
];

export const calculateDepositsWithMonthlyRate = (
  rate: number,
  goalValue: number,
  initialCapital: number,
  startDate?: Date,
): DepositRateDto[] | undefined => {
  let goalCopy = goalValue - initialCapital;
  const depositRateNumber = goalCopy / rate;

  if (depositRateNumber > 200) {
    return undefined;
  }
  let capital = initialCapital;

  const start = startDate ?? addMonths(new Date(), 0);

  const depositRates: DepositRateDto[] = [
    {
      key: GetKeyFromDate(start),
      value: capital,
      savingMonth: start,
      isPaid: true,
    },
  ];

  for (let i = 1; i <= depositRateNumber; i++) {
    const monthOfSaving = addMonths(start, i);
    const key = GetKeyFromDate(monthOfSaving);
    capital += rate;
    const depositRate: DepositRateDto = {
      key: key,
      value: capital,
      savingMonth: startOfDay(monthOfSaving),
    };
    depositRates.push(depositRate);
    goalCopy = goalCopy - rate;
  }

  if (goalCopy % rate != 0) {
    const lastSavingMonth = addMonths(start, useCeil(depositRateNumber));
    const key = GetKeyFromDate(lastSavingMonth);
    const depositRate: DepositRateDto = {
      key: key,
      value: goalValue,
      savingMonth: lastSavingMonth,
    };
    depositRates.push(depositRate);
  }

  return depositRates;
};

export const calculateDepositsWithDate = (
  startDate: Date,
  endDate: Date,
  goalValue: number,
  initialCapital: number,
): { depositRates: DepositRateDto[]; monthRate: number } => {
  let goalCopy = goalValue - initialCapital;
  const monthRange = differenceInCalendarMonths(endDate, startDate);
  const monthRate = useCeil(goalCopy / monthRange, 2);
  let capital = initialCapital;

  const depositRates: DepositRateDto[] = [
    {
      key: GetKeyFromDate(addMonths(startDate, -1)),
      value: capital,
      savingMonth: startDate,
      isPaid: true,
    },
  ];
  for (let i = 1; i <= monthRange; i++) {
    const monthOfSaving = addMonths(startDate, i);
    const key = `${getMonth(monthOfSaving)}-${getYear(monthOfSaving)}`;
    capital += monthRate;
    const depositRate: DepositRateDto = {
      key: key,
      value: useCeil(capital, 2),
      savingMonth: monthOfSaving,
    };
    depositRates.push(depositRate);
    goalCopy = goalCopy - monthRate;
  }

  return { depositRates: depositRates, monthRate: monthRate };
};

export const ConvertKeyIntoDate = (key: string): Date => {
  const parts = key.split("-");
  const month = +parts[0];
  const year = +parts[1];
  return new Date(year, month, 1);
};

export const GetKeyFromDate = (date: Date): string => {
  const month = date.getMonth() + 1;
  const year = getYear(date);

  return `${month}-${year}`;
};
