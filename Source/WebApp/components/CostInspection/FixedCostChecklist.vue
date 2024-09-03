<template>
  <div
    v-if="selectedCostInspection"
    class="flex flex-1 flex-col p-2 border-2 border-border rounded-lg rounded-br-[2rem] rounded-tl-[2rem] shadow-lg bg-foreground"
  >
    <div
      v-if="isUpdateable"
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
    <p
      class="text-center text-xl pb-1 border-b-2 mb-2 mx-3 text-highlight-text"
    >
      Fixkosten
    </p>
    <div
      v-for="fixcost in selectedCostInspection.fixedCostChecklist"
      :key="fixcost.key"
      class="flex-center relative border-b-2 border-border py-2 cursor-pointer text-highlight-text"
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
  FixedCostDto,
  UpdateCheckableFixedCostRequest,
} from "~/stores/apiClient";
import { useApiStore } from "~/stores/apiStore";
import { useInspectionStore } from "~/stores/costInspectionStore";
import { useFixedCostStore } from "~/stores/fixedCostStore";

const costInspectionStore = useInspectionStore();
const { groupCosts } = storeToRefs(useFixedCostStore());
const { fetch, selectedCostInspection, isUpgradeable } =
  storeToRefs(costInspectionStore);

const isUpdateable = computed(() => calculateUpgradeable());
const calculateUpgradeable = (): Boolean => {
  const totalFixedcosts = getTotalFixcosts();

  if (
    totalFixedcosts.length !=
    selectedCostInspection.value.fixedCostChecklist?.length
  )
    return true;
  const checklistCompareArray =
    selectedCostInspection.value.fixedCostChecklist.map((x) => {
      return { name: x.name, value: x.value };
    });
  const totalFixedcostCompareArray = totalFixedcosts.map((x) => {
    {
      return { name: x.name, value: x.value };
    }
  });
  const isEqualBool = isEqual(
    totalFixedcostCompareArray,
    checklistCompareArray,
  );
  return !isEqualBool;
};

const getTotalFixcosts = (): FixedCostDto[] => {
  return groupCosts.value.flatMap((a) => a.fixedCosts);
};
const getFixcostCount = (): number => {
  const groupCostFixCount = groupCosts.value.map((x) => {
    return x.fixedCosts?.length;
  });
  return useSum(groupCostFixCount);
};

const fixedCostUpToDate = async () => {
  if (selectedCostInspection.value === undefined) {
    return;
  }
  const insp = selectedCostInspection.value as CostInspectionDto;
  const request: CheckableFixedCostUptoDateRequest = {
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
