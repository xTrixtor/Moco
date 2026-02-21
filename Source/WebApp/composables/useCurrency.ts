export const useCurrency = () => {
  const formatCentsToEuro = (cents: number | undefined | null): string => {
    if (cents == null || isNaN(cents)) {
      cents = 0;
    }

    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(cents / 100);
  };

  return { formatCentsToEuro };
};
