<template>
  <div
    v-if="selectedCostInspection"
    class="w-full flex flex-1 flex-col p-2 border-2 border-border rounded-lg rounded-br-[2rem] rounded-tl-[2rem] shadow-lg bg-foreground"
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
        class="cursor-pointer hover:!text-primary duration-300"
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
      v-for="fixcost in sortedChecklist"
      :key="fixcost.key"
      class="flex-center relative border-b-2 border-border py-2 cursor-pointer text-highlight-text"
    >
      <Checkbox
        v-model="fixcost.isChecked"
        :inputId="fixcost.key"
        :value="fixcost.name"
        :binary="true"
        @click="checkFixcost(fixcost)"
      />
      <label :for="`${fixcost.key}`" class="ml-6 flex-1 w-max-[45%] truncate">
        {{ fixcost.name }}
      </label>
      <label :for="`${fixcost.key}`" class="ml-2 flex-1 flex justify-end mr-6">
        {{ fixcost.value }} €
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import {
  CheckableFixedCostDto,
  CheckableFixedCostUDto,
  FixedCostDto,
  UpdateCheckableFixedCostRequest,
} from "~/stores/apiClient";
import { useApiStore } from "~/stores/apiStore";
import { useInspectionStore } from "~/stores/costInspectionStore";
import { useFixedCostStore } from "~/stores/fixedCostStore";

const costInspectionStore = useInspectionStore();
const { groupCosts } = storeToRefs(useFixedCostStore());
const { selectedCostInspection } =
  storeToRefs(costInspectionStore);

var sortedChecklist = computed(() =>{
  return useOrderBy(
    selectedCostInspection.value.fixedCostChecklist,
    ["value"],
    ["desc"]
  );
} 
);

const isUpdateable = computed(() => calculateUpgradeable());
const calculateUpgradeable = (): Boolean => {
  const allFixcosts = getAllFixcosts();

  if (
    allFixcosts.length !=
    selectedCostInspection.value.fixedCostChecklist?.length
  ) {
    return true;
  }
  
  const checklistCompareArray =
    selectedCostInspection.value.fixedCostChecklist.map((checkableFixcost) => {
      return {
        name: checkableFixcost.name,
        value: useRound(checkableFixcost.value,2), 
      };
    });

  const totalFixedcostCompareArray = allFixcosts.map((x) => {
    {
      return { name: x.name, value: calculateMontlyChargeCost(x), timeInterval: x.timeInterval };
    }
  });

  const totalFixedCosts = useSumBy(totalFixedcostCompareArray, function (cost : FixedCostDto) {
    return cost.value;
  });

  const totalCheckableFixcosts = useSumBy(
    checklistCompareArray,
    function (cost: FixedCostDto) {
      return cost.value;
    }
  );  
  
  console.log(totalCheckableFixcosts)
  console.log(totalFixedCosts)
  
  if (useRound(totalCheckableFixcosts, 2) != useRound(totalFixedCosts, 2)) {
    return true;
  }

  const isEqualBool = isEqual(
    totalFixedcostCompareArray,
    checklistCompareArray
  );

  return isEqualBool;

};

const getAllFixcosts = (): FixedCostDto[] => {
  return groupCosts.value.flatMap((a) => a.fixedCosts) as FixedCostDto[];
};

const fixedCostUpToDate = async () => {
  if (selectedCostInspection.value === undefined) {
    return;
  }
  await costInspectionStore.updateSelectedCostInspection();
};

const checkFixcost = async (changedFixedCost: CheckableFixedCostDto) => {
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
