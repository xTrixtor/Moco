<template>
  <div
    v-if="selectedCostInspection"
    class="flex flex-col p-2 border-2 border-border rounded-lg rounded-br-[2rem] rounded-tl-[2rem] shadow-lg"
    :class="calculateCardColor()"
  >
    <div
      v-if="isUpgradeable"
      class="flex w-full justify-end"
      v-tooltip="'Update Checkliste'"
      placeholder="right"
    >
      <Icon
        name="grommet-icons:upgrade"
        @click="fixedCostUpToDate"
        class="rotate-180 cursor-pointer hover:!text-primary duration-300"
        size="1.5rem"
        color="white"
      />
    </div>
    <p class="text-center text-xl pb-1 border-b-2 mb-2 mx-3">Fixkosten</p>
    <div
      v-for="(fixcost, key) in selectedCostInspection.fixedCostChecklist"
      class="flex-center text-white text-md border-b-2 border-border/50 pb-1 my-1 hover:bg-slate-200/25 cursor-pointer relative"
      @click="checkedFixedCost(fixcost)"
    >
      <div
        v-if="fixcost.isChecked"
        class="w-full absolute border-b-2 border-black"
      ></div>
      <div class="w-3/5 truncate mx-1">
        {{ fixcost.fixedCost?.name }}
      </div>
      <div class="w-1/4 truncate mx-1">
        {{ calculateMontlyChargeCost(fixcost.fixedCost) }} €
      </div>
      <div class="flex-center mx-1">
        <input type="checkbox" v-model="fixcost.isChecked" class="text-xl" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import {
  CheckableFixedCostDto,
  CheckableFixedCostUDto,
  CheckableFixedCostUptoDateRequest,
  CostInspectionDto,
  UpdateCheckableFixedCostRequest,
} from "~/stores/apiClient";
import { useApiStore } from "~/stores/apiStore";
import { useInspectionStore } from "~/stores/costInspectionStore";

const costInspectionStore = useInspectionStore();
const { fetch, selectedCostInspection, isUpgradeable } =
  storeToRefs(costInspectionStore);

const fixedCostUpToDate = async () => {
  if (selectedCostInspection.value === undefined) {
    return;
  }
  const insp = selectedCostInspection.value as CostInspectionDto;
  const request: CheckableFixedCostUptoDateRequest = {
    isUpgradeable: toValue(isUpgradeable),
    alreadyCreatedCheckableFixedCosts: insp.fixedCostChecklist,
    costInspectionId: insp.id,
  };
  await useApiStore().InspectionClient.checkableFixedCostUptoDate(request);
  await costInspectionStore.fetch();
};

const checkedFixedCost = async (changedFixedCost: CheckableFixedCostDto) => {
  changedFixedCost.isChecked = !changedFixedCost.isChecked;
  const uDto: CheckableFixedCostUDto = {
    id: changedFixedCost.id,
    isChecked: changedFixedCost.isChecked,
  } as CheckableFixedCostUDto;
  await useApiStore().InspectionClient.checkFixedCost({
    checkableFixedCostUDto: uDto,
  } as UpdateCheckableFixedCostRequest);
};

const calculateCardColor = (): String => {
  const sum = useSumBy(
    selectedCostInspection.value.fixedCostChecklist,
    function (fixedCost: CheckableFixedCostDto) {
      return fixedCost.fixedCost?.value;
    }
  );
  const checkedFixedCosts = useFilter(
    selectedCostInspection.value.fixedCostChecklist,
    function (fixedCost: CheckableFixedCostDto) {
      return fixedCost.isChecked;
    }
  );
  const checkedFixedCostSum = useSumBy(
    checkedFixedCosts,
    function (fixedCost: CheckableFixedCostDto) {
      return fixedCost.fixedCost?.value;
    }
  );

  const fixedCostProcent = (checkedFixedCostSum / sum) * 100;
  return getBgColorInProcent(fixedCostProcent);
};

const getBgColorInProcent = (valueInProcent: number): String => {
  switch (true) {
    case valueInProcent > 50 && valueInProcent < 75:
      return "bg-yellow-500/75";
    case valueInProcent > 75 && valueInProcent < 100:
      return "bg-green-300/75";
    case valueInProcent >= 100:
      return "bg-green-500/75";
    default:
      return "bg-red-600/75";
  }
};
</script>

<style scoped>
input[type="checkbox"] {
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 5px;
  border: 2px solid #555;
  cursor: pointer;
}

input[type="checkbox"]:checked {
  @apply bg-primary;
}
</style>
