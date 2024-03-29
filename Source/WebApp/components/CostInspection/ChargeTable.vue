<template>
  <div v-if="selectedMontlyBudget" class="h-full">
    <div class="flex-center">
      <p class="underlineAnimation w-full text-xl text-center mb-4">
        {{ selectedMontlyBudget.name }}
      </p>
    </div>
    <div class="h-5/6 overflow-auto flex"
    :class="charges.length>0?'flex-col-reverse':'flex-col'">
      <CostInspectionAddInlineCharge />
      <div class="flex-1">
        <div
          v-for="(charge, key) in charges"
          class="flex-center justify-between border-b-2 border-border h-9 px-1"
          :class="[
            key % 2 ? '!bg-secondary border-y-0' : 'bg-secondary-light',
            key == 0 ? 'rounded-tr-2xl' : '',
          ]"
        >
          <div class="w-3/5">
            <BaseEditInput
              v-model="charge.name"
              @leave="updateBudgetCharge(charge)"
            />
          </div>
          <div class="w-1/5">
            <BaseEditInput
              v-model="charge.value"
              @leave="updateBudgetCharge(charge)"
              input-extension="€"
              type="number"
            />
          </div>
          <TableActionCell
            class="w-1/5"
            :unique-key="`${key}`"
            :dto="charge"
            label="diese Kosten"
            :delete-api-call="() => deleteCharge(charge.id)"
          />
        </div>
      </div>
    </div>

    <div class="flex-center" :class="calculateSumBgColor()">
      {{ useFloor(sum, 2) }}
      € / {{ selectedMontlyBudget.limit }} €
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import {
  ChargeDto,
  ChargeUDto,
  MonthlyBudgetDto,
  UpdateChargeRequest,
} from "~/stores/apiClient";
import { useInspectionStore } from "~/stores/costInspectionStore";
import TableActionCell from "../FixedCosts/TableActionCell.vue";
import { useApiStore } from "~/stores/apiStore";

const costInspectionStore = useInspectionStore();

const { selectedMontlyBudget, selectedCostInspection } =
  storeToRefs(costInspectionStore);

const charges = computed(() =>
  getCharges(selectedCostInspection?.value?.monthlyBudgets ?? [])
);

const getCharges = (monthlyBudgetCharges?: MonthlyBudgetDto[]): ChargeDto[] => {
  const selectedBudgetWithCharges = monthlyBudgetCharges?.filter(
    (x:MonthlyBudgetDto) => x?.id === selectedMontlyBudget.value.id
  )[0];
  return selectedBudgetWithCharges?.charges??[];
};

const sum = computed(() =>
  useSumBy(charges.value, function (charge: ChargeDto) {
    return charge.value;
  })
);
const deleteCharge = async (id: number) => {
  await useApiStore().ChargeClient.deleteChargeEndpoint(id);
  await useInspectionStore().fetch();
};

const updateBudgetCharge = async (charge: ChargeDto) => {
  const chargeUDto: ChargeUDto = {
    monthlyBudgetId: charge.monthlyBudgetId,
    id: charge.id,
    value: charge.value,
    name: charge.name,
  };
  useApiStore().ChargeClient.updateChargeEndpoint({
    chargeUDto,
  } as UpdateChargeRequest);
};

const calculateSumBgColor = () => {
  const procent = sum.value / selectedMontlyBudget.value.limit??0;
  switch (true) {
    case procent > 0.8 && procent < 1:
      return "bg-yellow-200/75";
    case sum.value >= selectedMontlyBudget.value.limit??0:
      return "bg-red-500/75";
    default:
      return "bg-green-300/75";
  }
};
</script>

<style scoped></style>
