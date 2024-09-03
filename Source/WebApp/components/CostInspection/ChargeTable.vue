<template>
  <div v-if="selectedMontlyBudget" class="h-full">
    <div class="flex-center items-center underlineAnimation mb-2">
      <p class="w-full text-xl text-center">
        {{ selectedMontlyBudget.name }}
      </p>
      <Icon
        class="flex justify-center items-center cursor-pointer text-green-600 duration-300 mr-1 opacity-60 hover:opacity-100"
        size="1.5rem"
        name="ant-design:edit-outlined"
        @click="() => (editModalVis = true)"
      />
    </div>
    <div
      class="h-5/6 overflow-auto flex"
      :class="charges.length > 0 ? 'flex-col-reverse' : 'flex-col'"
    >
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
          <div class="w-1/2">
            <BaseEditInput
              v-model="charge.name"
              @leave="updateBudgetCharge(charge)"
            />
          </div>
          <div class="w-[30%]">
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

  <Dialog
    v-model:visible="editModalVis"
    modal
    :header="'Bearbeitung von: ' + selectedMontlyBudget.name"
    :style="{ width: '25rem' }"
  >
    <div class="w-full h-full py-4 px-1 rounded-lg">
      <div class="flex-center">
        <p class="w-1/2">Name</p>
        <BaseCustomInput
          v-model="editMonthlyBudget.name"
          type="text"
          :placeholder="editMonthlyBudget.name"
          :clearable="true"
        />
      </div>
      <div class="flex-center">
        <p class="w-1/2">Kosten</p>
        <BaseCustomInput
          v-model="editMonthlyBudget.limit"
          type="number"
          :placeholder="editMonthlyBudget.limit"
          :clearable="true"
        />
      </div>
    </div>
    <div
      class="flex flex-row-reverse justify-between"
      v-if="selectedMontlyBudget.limit != 0"
    >
      <div
        class="w-8 h-8 flex items-center justify-center rounded-full mt-2"
        :class="
          !isDirty
            ? ' bg-slate-300 !cursor-not-allowed duration-500 '
            : ' bg-secondary border-2 border-border hover:-translate-y-1 duration-300 hover:shadow-indigo-400 shadow-lg hover:cursor-pointer hover:bg-secondary-light'
        "
      >
        <Icon
          name="material-symbols:save-outline"
          class="text-white"
          @click="handleUpdateMonthlyBudget()"
          size="1.5rem"
        />
      </div>
    </div>
    <div v-else>
      <Icon name="eos-icons:bubble-loading" size="1.5rem" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import {
  ChargeDto,
  ChargeUDto,
  CostInspectionDto,
  MonthlyBudgetDto,
  UpdateChargeRequest,
  MonthlyBudgetUDto,
} from "~/stores/apiClient";
import { useInspectionStore } from "~/stores/costInspectionStore";
import TableActionCell from "../FixedCosts/TableActionCell.vue";
import { useApiStore } from "~/stores/apiStore";

const editModalVis = ref(false);
const isDirty = ref(false);

const costInspectionStore = useInspectionStore();

const { selectedMontlyBudget, selectedCostInspection } =
  storeToRefs(costInspectionStore);

const charges = computed(() =>
  getCharges(selectedCostInspection?.value?.monthlyBudgets ?? []),
);

const editMonthlyBudget: Ref<MonthlyBudgetUDto> = ref({
  name: selectedMontlyBudget.value.name,
  id: selectedMontlyBudget.value.id,
  limit: selectedMontlyBudget.value.limit,
});

const getCharges = (monthlyBudgetCharges?: MonthlyBudgetDto[]): ChargeDto[] => {
  const selectedBudgetWithCharges = monthlyBudgetCharges?.filter(
    (x: MonthlyBudgetDto) => x?.id === selectedMontlyBudget.value.id,
  )[0];
  return selectedBudgetWithCharges?.charges ?? [];
};

const sum = computed(() =>
  useSumBy(charges.value, function (charge: ChargeDto) {
    return charge.value;
  }),
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
  const procent = sum.value / selectedMontlyBudget.value.limit ?? 0;
  switch (true) {
    case procent > 0.8 && procent < 1:
      return "bg-yellow-200/75";
    case sum.value >= selectedMontlyBudget.value.limit ?? 0:
      return "bg-red-500/75";
    default:
      return "bg-green-300/75";
  }
};

const handleUpdateMonthlyBudget = async () => {
  const { limit, name } = editMonthlyBudget.value;

  const response =
    await useApiStore().InspectionClient.updateMonthlyBudgetEnpoint({
      limit: limit,
      name: name,
      monthlyBudgetId: editMonthlyBudget.value.id,
    });

  if (response.success) {
    selectedMontlyBudget.value.limit = limit;
    selectedMontlyBudget.value.name = name;
    editModalVis.value = false;
  }
};

watchDeep(editMonthlyBudget, (newVal) => {
  isDirty.value = isDirtyCalc(newVal as CostInspectionDto);
});

const isDirtyCalc = (newMonthlyBudget: ChargeDto): boolean => {
  let isDirty = false;
  const compareProperties = ["name", "limit"];
  compareProperties.forEach((prop) => {
    if (newMonthlyBudget[prop] != editMonthlyBudget[prop]) {
      isDirty = true;
    }
  });
  return isDirty;
};

onKeyStroke("Enter", async (e) => {
  await handleUpdateMonthlyBudget();
});
</script>

<style scoped></style>
