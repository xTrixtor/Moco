<template>
  <div class="flex flex-col flex-1 w-full h-full">
    <div class="flex">
      <CostInspectionDatePickerRow />
    <div v-if="selectedCostInspection">
      <Icon class="flex h-full justify-center items-center cursor-pointer text-red-600 duration-300 opacity-60 hover:opacity-100" size="2rem" name="material-symbols:delete-outline" @click="confirmDelete"/>
    </div>
    </div>
    <div v-if="!selectedCostInspection" class="flex-center">
      <CostInspectionCreateInspectionButton />
    </div>
    <div v-else class="grid grid-rows-2 xl:grid-cols-5 xl:grid-rows-1 flex-1 gap-3">
      <div class="col-span-3 xl:col-span-2 flex-col flex gap-3">
        <CostInspectionOverviewRow/>
        <div class="flex flex-1 w-full h-full gap-2">
          <CostInspectionFixedCostChecklist />
          <CostInspectionBudgetInspection />
        </div>
      </div>
      <div class="col-span-3 flex-col flex">
        <div
          class="bg-background/10 flex-1 w-full border-2 border-border rounded-lg"
        >
          <CostInspectionBudgetSideBySideChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useInspectionStore } from "~/stores/costInspectionStore";
import { useFixedCostStore } from "~/stores/fixedCostStore";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useApiStore } from "~/stores/apiStore";

const { selectedCostInspection } = storeToRefs(useInspectionStore());
const confirm = useConfirm();
const toast = useToast();

const costInspectionClient = useApiStore().InspectionClient;

const confirmDelete = () =>{
  confirm.require({
        message: `Willst du Kosten-Inspektion von diesem Monat löschen?`,
        header: 'Achtung!',
        icon: 'pi pi-exclamation-triangle',
        accept: async() => {
            await costInspectionClient.deleteCostInspectionEndpoint(selectedCostInspection.value.id);
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Erfolgreich gelöscht', life: 3000 });
            await useInspectionStore().fetch();
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'Beim Löschen ist etwas schief gelaufen', life: 3000 });
        }
    });
}

onMounted(async () => {
  try {
    await useInspectionStore().fetch();
    await useFixedCostStore().fetch();
  } catch (e) {}
});
</script>

<style scoped></style>
