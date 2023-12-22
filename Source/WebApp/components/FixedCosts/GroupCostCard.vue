<template>
  <div
    class="bg-indigo-300 max-h-[50vh] min-h-[5vh] w-full md:w-[300px] ring-2 ring-slate-300 rounded-lg rounded-bl-[2rem] rounded-tr-[2rem] m-2 shadow-lg shadow-slate-400 hover:ring-offset-2 hover:ring-brand duration-200 cursor-pointer"
  >
    <div class="flex-center border-b-2 py-2 mx-2">
      <p class="ml-2 text-lg flex-1">{{ props.groupCost.name }}</p>
      <Icon
        class="flex justify-center items-center cursor-pointer text-red-600 duration-300 w-8 opacity-70 hover:opacity-100"
        size="1.5rem"
        name="line-md:cancel"
        @click="confirmDelete"
      />
    </div>
    <FixedCostTable :fixedcosts="props.groupCost.fixedCosts ?? []" />
    <div
      class="w-full bg-yellow-100 py-1 flex justify-between px-4 font-medium text-sm rounded-bl-[2rem] rounded-br-lg"
    >
      <div>Summe:</div>
      <div>
        {{ useCeil(gropucostSum, 2) }}
        €
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChargeDto, GroupCostDto } from "~/stores/apiClient";
import FixedCostTable from "./FixedCostTable.vue";
import { useApiStore } from "~/stores/apiStore";
import { useFixedCostStore } from "~/stores/fixedCostStore";

interface GroupCostCard {
  groupCost: GroupCostDto;
}

const props = defineProps<GroupCostCard>();

const gropucostSum = computed(() =>
  useSumBy(props.groupCost.fixedCosts, function (o: ChargeDto) {
    return calculateMontlyChargeCost(o);
  })
);

const confirmDelete = () => {
  ElMessageBox.confirm(
    "Bist du dir sicher diese Kosten-Gruppe mit allen seinen Kosten zu löschen?",
    "Warning",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Schließen",
      type: "warning",
    }
  )
    .then(async () => {
      await useApiStore().GroupcostClient.deleteGroupCostEndpoint(
        props.groupCost.id
      );
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
<style></style>
