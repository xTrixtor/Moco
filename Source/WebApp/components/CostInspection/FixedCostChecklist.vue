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
    <p class="text-center text-xl pb-1 border-b-2 mb-2 mx-3 text-highlight-text">Fixkosten</p>
    <div
      v-for="fixcost in selectedCostInspection.fixedCostChecklist"
      :key="fixcost.key"
      class="flex-center relative border-b-[1px] border-border py-1 cursor-pointer"
    >
      <div
        v-if="fixcost.isChecked"
        class="w-full absolute h-full z-10"
        @click="checkedFixedCost(fixcost)"
      >
        <div class="border-b-2 border-background h-1/2" />
      </div>
      <Checkbox
        v-model="fixcost.isChecked"
        :inputId="fixcost.key"
        :value="fixcost.name"
        :binary="true"
        @click="checkedFixedCost(fixcost)"
      />
      <div class="flex-center justify-between w-full mx-2">
        <label :for="fixcost.key" class="flex-1">{{ fixcost.name }}</label>
        <label :for="fixcost.key">{{ fixcost.value }} €</label>
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
    checkableFixcostKey: changedFixedCost.key,
    costInspectionId: selectedCostInspection.value.id,
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
      return fixedCost?.value;
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
      return "bg-warning-content";
    case valueInProcent > 75 && valueInProcent < 100:
      return "bg-success-content";
    case valueInProcent >= 100:
      return "bg-success-content";
    default:
      return "bg-error-content";
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
