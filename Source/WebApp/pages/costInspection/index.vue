<template>
  <BaseFullScreenLoader v-if="loading" />
  <div
  v-else 
  class="flex flex-col flex-1 w-full h-full">
    <div class="flex">
      <CostInspectionDatePickerRow />
      <div v-if="selectedCostInspection">
        <Icon
          class="flex h-full justify-center items-center cursor-pointer text-red-600 duration-300 opacity-60 hover:opacity-100"
          size="2rem"
          name="material-symbols:delete-outline"
          @click="confirmDelete"
        />
      </div>
    </div>
    <div v-if="!selectedCostInspection" class="flex-center flex-1">
      <CostInspectionCreateInspectionButton />
    </div>
    <div
      v-else
      class="grid grid-cols-1 xl:grid-cols-5 xl:grid-rows-1 flex-1 xl:gap-3"
    >
      <div class="xl:col-span-2 flex-col flex gap-3">
        <CostInspectionOverviewRow />
        <div class="flex flex-1 w-full h-full gap-2">
          <CostInspectionFixedCostChecklist />
          <CostInspectionBudgetInspection v-if="!isMobil" />
        </div>
        <CostInspectionBudgetInspection v-if="isMobil" />
        <div v-if="isMobil"
          class="bg-background/10 flex-1 w-full border-2 border-border rounded-lg"
        >
          <CostInspectionBudgetSideBySideChart />
        </div>
      </div>
      <div v-if="!isMobil" class="col-span-3 flex-col flex ">
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
import { useUtilStore } from "~/stores/utilStore";

const { isMobil } = storeToRefs(useUtilStore());

const { selectedCostInspection } = storeToRefs(useInspectionStore());
const confirm = useConfirm();
const toast = useToast();
const loading = ref(false);

const confirmDelete = () => {
  confirm.require({
    message: `Willst du Kosten-Inspektion von diesem Monat löschen?`,
    header: "Achtung!",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {

      useInspectionStore().deleteSelectedCostInspectionFetch();

      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "Erfolgreich gelöscht",
        life: 3000,
      });
      await useInspectionStore().fetch();
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Rejected",
        detail: "Beim Löschen ist etwas schief gelaufen",
        life: 3000,
      });
    },
  });
};

onMounted(async () => {
  try {
    loading.value = true;
    await useInspectionStore().fetch();
    await useFixedCostStore().fetch();
    loading.value = false;
  } catch (e) {}
});
</script>

<style scoped></style>
