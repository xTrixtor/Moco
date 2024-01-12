import { useFixedCostStore } from "~/stores/fixedCostStore";

export const groupCostSuggestions : string[] = [ "Abonnements", "Auto", "Allgemein", "Investieren", "Versicherung", "Wohnen"];

export const getGroupcostSuggestions = () : string[] => {
    const {groupCostOptions} = useFixedCostStore();
    const currentGroupCostNames = groupCostOptions.map(x => x.name);
    return groupCostSuggestions.filter(x => !currentGroupCostNames.includes(x));
}
