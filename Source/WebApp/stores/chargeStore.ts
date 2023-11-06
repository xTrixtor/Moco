import { defineStore } from "pinia";
import { ChargesByTimeIntervalDictionary } from "~/pages/index.vue";
import { ChargeDto, TimeInterval } from "./apiClient";
import { useApiStore } from "./apiStore";

export const useChargeStore = defineStore("charge", {
  state: () => {
    const charges = [] as ChargeDto[];
    const groupedCharges : ChargesByTimeIntervalDictionary | undefined = undefined;

    return {
    charges,
    groupedCharges,
    fetch,
    };
  },
  actions: {
    addCharge(charge: ChargeDto){
      this.charges = [...this.charges, charge];
      this.groupCharges()
    },
    async fetch() {
    const response =
        await useApiStore().ChargeClient.getChargesEndpoint();
    if (response.charges) this.setCharges(response.charges);
    this.groupCharges();
    },
    groupCharges(){
      const groupedCharges = useGroupBy(
        this.charges,
        "timeInterval"
      ) as ChargesByTimeIntervalDictionary;
      this.setGroupedCharges(groupedCharges)
    },
    setCharges(charges: ChargeDto[]) {
      this.charges = charges
    },
    setGroupedCharges(groupedCharges: ChargesByTimeIntervalDictionary) {
        this.groupedCharges = groupedCharges
    },
    
    },
  },
);
