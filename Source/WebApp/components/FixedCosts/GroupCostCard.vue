<template>
  <div
    ref="target"
    class="bg-card max-h-[50vh] min-h-[5vh] w-full md:w-[300px] ring-2 ring-border rounded-lg rounded-bl-[2rem] rounded-tr-[2rem] my-2 shadow-lg shadow-slate-400 hover:ring-offset-2 hover:ring-primary duration-200 cursor-pointer"
    @click="fixedCostStore.setSelectedGroupCost(props.groupCost)"
    >
    <div class="flex-center border-b-2 py-2 mx-2">
      <p class="ml-2 text-lg flex-1 text-white">{{ props.groupCost.name }}</p>
      <Icon
        class="flex justify-center items-center cursor-pointer duration-300 w-8 opacity-70 hover:opacity-100 !text-red-600"
        size="1.5rem"
        name="line-md:cancel"
        @click="confirmDelete"
        id="deleteIcon"
      />
    </div>
    <FixedCostTable :fixedcosts="props.groupCost.fixedCosts ?? []" />
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
provide("groupCost", props.groupCost)
const fixedCostStore = useFixedCostStore();
const target = ref(null)
onClickOutside(target,() => fixedCostStore.setSelectedGroupCost({}))

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
      await fixedCostStore.fetch();
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
