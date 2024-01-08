import { useFixedCostStore } from "~/stores/fixedCostStore";

export interface AutoCompleteSuggestion{
    value:string;
}
export const groupCostSuggestions : AutoCompleteSuggestion[] = [
  { value: "Abonnements" },
  { value: "Auto" },
  { value: "Allgemein" },
  { value: "Investieren" },
  { value: "Versicherung" },
  { value: "Wohnen" },
];

export const getGroupcostSuggestions = () : AutoCompleteSuggestion[] => {
    const {groupCostOptions} = useFixedCostStore();

    return groupCostSuggestions.filter(x => !useSome(groupCostOptions, {name:x.value}))
}
