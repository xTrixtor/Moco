<template>
  <div v-if="selectedBudget" class="flex-1">
    <div class="flex-center">
      <p class="underlineAnimation w-full text-xl text-center mb-4">
        {{ selectedBudget.name }}
      </p>
    </div>
    <div
      v-for="(charge, key) in charges"
      class="flex-center justify-between border-b-2 border-border h-9"
      :class="[
        key % 2 ? '!bg-secondary border-y-0' : 'bg-secondary-light',
        key == 0 ? 'rounded-tr-2xl' : '',
      ]"
    >
      <div class="w-3/5">
        <BaseEditInput v-model="charge.chargeName" @leave="updateBudgetCharge(charge)" />
      </div>
      <div class="w-1/5">
        <BaseEditInput v-model="charge.value" @leave="updateBudgetCharge(charge)" input-extension="€" type="number"/>
      </div>
      <TableActionCell
        class="w-1/5"
        :unique-key="`${key}`"
        :dto="charge"
        label="diese Kosten"
        :delete-api-call="() => deleteCharge(charge.id)"
      />
    </div>
    <CostInspectionAddInlineCharge/>
    <div class="flex-center" :class="calculateSumBgColor()">
      {{ useFloor(sum,2) }}
      € / {{ selectedBudget.limit }} €
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { BudgetDto, ChargeDto, ChargeUDto, UpdateChargeRequest } from "~/stores/apiClient";
import { useInspectionStore } from "~/stores/costInspectionStore";
import TableActionCell from "../FixedCosts/TableActionCell.vue";
import { useApiStore } from "~/stores/apiStore";

const costInspectionStore = useInspectionStore();

const { selectedBudget, selectedCostInspection } =
  storeToRefs(costInspectionStore);

const charges = computed(() => getCharges(selectedBudget?.value?.charges??[]));

const getCharges = (budgetCharges: BudgetDto[]): BudgetDto[] =>{
    if(!budgetCharges){
      return [];
    }
    const filteredArray =  selectedCostInspection.value.budgetCharges?.filter(
    (x) => x.budgetId === selectedBudget.value.id);
    return filteredArray;
}

const sum = computed(() =>
  useSumBy(charges.value, function (charge: ChargeDto) {
    return charge.value;
  })
);
const deleteCharge = async (id: number) => {
  await useApiStore().ChargeClient.deleteChargeEndpoint(id);
  await useInspectionStore().fetch();
};

const updateBudgetCharge = async(charge: ChargeDto) => {
  const chargeUDto: ChargeUDto = {budgetId: charge.budgetId, costInspectionId: charge.costInspection?.id, id: charge.id, chargeName: charge.chargeName};
  useApiStore().ChargeClient.updateChargeEndpoint({chargeUDto} as UpdateChargeRequest)
}

const calculateSumBgColor = () => {
  const procent = sum.value / selectedBudget.value.limit;
  switch (true) {
    case procent > 0.8 && procent < 1:
      return "bg-yellow-200/75";
    case sum.value >= selectedBudget.value.limit:
      return "bg-red-500/75";
    default:
      return "bg-green-300/75";
  }
};
</script>

<style scoped></style>
