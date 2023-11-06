<template>
  <div
    v-if="groupedCharges"
    class="bg-slate-50 flex w-full h-full py-8 px-4"
  >
    <div class="col-span-3 grid grid-cols-3 gap-2 w-2/3">
      <div v-for="(interval, key) in keys">
        <div v-if="groupedCharges[+interval]">
          <IntervalCard
            :charges="groupedCharges[+interval]"
            :interval="interval"
          />
        </div>
      </div>
    </div>
    <div class="flex-1 flex h-full w-full justify-center">
      <DxPieChart
        :data-source="totalValues"
        title="Überblick"
        palette="Soft"
        class="pie"
        size-group="piesGroup"
      >
        <DxSeries
          argument-field="title"
          value-field="percent"
        >
          <DxLabel
            :visible="true"
            format="percent"
          />
        </DxSeries>
        <DxLegend
          :row-count="1"
          vertical-alignment="bottom"
          horizontal-alignment="center"
          item-text-position="right"
        />
      </DxPieChart>
    </div>
  </div>

</template>

<script setup lang="ts">
import { useApiStore } from "~/stores/apiStore";
import {
ChargeDto,
GetRevenuesResponse,
TimeInterval,
} from "@/stores/apiClient";
import { storeToRefs } from 'pinia';
import { useChargeStore } from '~/stores/chargeStore';

const chargeStore = useChargeStore();
const {charges, groupedCharges} = storeToRefs(chargeStore)

const keys = computed(() => Object.keys(groupedCharges.value ?? ""));

export type ChargesByTimeIntervalDictionary = Record<
  TimeInterval,
  ChargeDto[]
>;

const revenue = computedAsync(async() =>
  await useApiStore().RevenueClient.getRevenuesEndpoint(),
  {} as GetRevenuesResponse
);

const totalRevenue = computed(()=> createTotalRevenue());
const totalCharges = computed(()=> createTotalCharges());
const totalValues = computed(() => createTotalValues());

onMounted(async () => {
  await chargeStore.fetch();
});

interface TotalValue {
  title:string;
  value:number;
  percent: number;
}
const createTotalRevenue = (): TotalValue => {
  return {title: "Gehalt", value: useCeil(useSumBy(revenue.value.revenues, "value"),2)} as TotalValue
}
const createTotalCharges = (): TotalValue => {
  return {title: "Feste Kosten", value: useSumBy(charges.value, "value")} as TotalValue
}

const createTotalValues = () => {
  const totalValuesList = [totalRevenue.value, totalCharges.value]
  const total = useSumBy(totalValuesList, "value")
  return totalValuesList.map((totalValue) =>{
    return {percent: totalValue.value/total, title: totalValue.title, value: totalValue.value} as TotalValue
  })
}

</script>
<style>

</style>