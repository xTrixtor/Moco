<template>
  <div v-if="groupedCharges" class="bg-slate-50 grid grid-cols-3 gap-2">
    <div v-for="(interval, key) in keys">
      <div v-if="groupedCharges[+interval]">
        <IntervalCard
          :charge="groupedCharges[+interval]"
          :interval="TimeInterval[+interval]"
          :key="key"
          v-for="(charge, key) in groupedCharges[interval]"
        />
        <IntervalCard />
      </div>
    </div>
  </div>
  {{ "t" + logoutTimer }}
  {{ keys }}
  <DxChart :data-source="data">
    <DxArgumentAxis :tick-interval="10" />
    <DxSeries type="bar" />
    <DxLegend :visible="false" />
  </DxChart>
</template>

<script setup lang="ts">
import DxChart, {
  DxArgumentAxis,
  DxSeries,
  DxLegend,
} from "devextreme-vue/chart";

import { useApiStore } from "~/stores/apiStore";
import {
  MocoApiModelsMocoDtoChargeDto,
  TimeInterval,
} from "@/stores/apiClient";
import { useUserStore } from "~/stores/userStore";
import { storeToRefs } from "pinia";

const { logoutTimer } = storeToRefs(useUserStore());

const userCharges = ref([] as MocoApiModelsMocoDtoChargeDto[]);
const groupedCharges = ref<ChargesByTimeIntervalDictionary>();
const timeIntervalKeys = enumKeys(TimeInterval);
const keys = computed(() => Object.keys(groupedCharges.value ?? ""));

type ChargesByTimeIntervalDictionary = Record<
  TimeInterval,
  MocoApiModelsMocoDtoChargeDto
>;

onMounted(async () => {
  const response =
    await useApiStore().ChargeClient.mocoApiEndpointsChargeGetBudgetsEndpoint();
  if (response.charges) userCharges.value = response.charges;

  const result = useGroupBy(
    response.charges,
    "timeInterval"
  ) as ChargesByTimeIntervalDictionary;
  console.log(result);
  groupedCharges.value = result;
});

const data = [
  {
    arg: 1990,
    val: 5320816667,
  },
  {
    arg: 2000,
    val: 6127700428,
  },
  {
    arg: 2010,
    val: 6916183482,
  },
];
function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}
</script>
