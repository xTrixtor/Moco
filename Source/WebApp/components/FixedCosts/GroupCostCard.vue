<template>
  <div
    class="bg-indigo-300 max-h-[50vh] min-h-[5vh] w-full md:w-[350px] border-4 rounded-lg rounded-bl-[2rem] rounded-tr-[2rem] m-1 border-brand shadow-lg shadow-slate-400"
  >
    <div class="flex-center border-b-2 py-2 mx-2">
      <p class="ml-2 text-lg flex-1">{{ props.groupCost.name??'asdf' }}</p>
      <Icon
        class="flex justify-center items-center cursor-pointer text-red-600 hover:!text-red-400 duration-300 mr-1 w-8"
        size="1.5rem"
        name="material-symbols:delete-outline"
        @click="confirmDelete"
      />
    </div>
    <FixedCostTable :fixedcosts="props.groupCost.fixedCosts ?? []" />
    <div
      class="w-full bg-yellow-100 py-1 flex justify-between px-4 font-medium text-sm rounded-bl-3xl rounded-br-md"
    >
      <div>Summe:</div>
      <div>
        {{
          useSumBy(props.groupCost.fixedCosts, function (o: ChargeDto) {
            return o.value;
          })
        }}
        €
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChargeDto, GroupCostDto } from "~/stores/apiClient";
import { useBudgetStore } from "~/stores/budgetStore";
import FixedCostTable from "./FixedCostTable.vue";
import { useApiStore } from "~/stores/apiStore";
import { useFixedCostStore } from "~/stores/fixedCostStore";


interface ChargeColumnProps {
  groupCost: GroupCostDto;
}

const props = defineProps<ChargeColumnProps>();

const confirmDelete = () => {
  ElMessageBox.confirm(
    "Bist du dir sicher dieses Budget mit allen seinen Kosten zu löschen?",
    "Warning",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Schließen",
      type: "warning",
    }
  )
    .then(async () => {
      await useApiStore().GroupcostClient.deleteGroupCostEndpoint(props.groupCost.id);
      await useFixedCostStore().fetch();
      ElMessage({
        type: "success",
        message: "Erfolgreich gelöscht",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Löschen abgebrochen",
      });
    });
};
</script>
<style>
.item {
  flex: 1 0 33%;
}
</style>
