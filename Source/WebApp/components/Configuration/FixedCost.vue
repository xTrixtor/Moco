<template>
  <div class="flex flex-col h-full w-full lg:p-4">
    <p class="text-xl text-primary underline underline-offset-4 mb-2">
      Fixkosten pro Monat
    </p>
    <Accordion v-if="groupCosts.length != 0" v-model:activeIndex="activeIndex">
      <AccordionTab
        v-for="(groupCost, key) in groupCosts"
        :key="key"
        :header="groupCost.name"
        :pt="{ content: { class: 'justify-center items-center p-1 lg:p-4' } }"
      >
        <template #header>
          <div class="flex flex-1 justify-end">
            <Icon
              class="flex justify-center items-center cursor-pointer text-red-600 duration-300 mr-1 opacity-20 hover:opacity-100"
              size="1.5rem"
              name="material-symbols:delete-outline"
              @click="() => confirmDelete(groupCost)"
            />
          </div>
        </template>
        <FixedCostTable
          :groupCost="groupCost"
          :fixedcosts="groupCost.fixedCosts ?? []"
        />
      </AccordionTab>
    </Accordion>
    <AddGroupCostCard />
  </div>
</template>

<script setup lang="ts">
import { useFixedCostStore } from "~/stores/fixedCostStore";
import { storeToRefs } from "pinia";
import FixedCostTable from "@/components/FixedCosts/FixedCostTable.vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import AddGroupCostCard from "~/components/FixedCosts/AddGroupCostCard.vue";
import type { GroupCostDto } from "~/stores/apiClient";
import { useApiStore } from "~/stores/apiStore";

const fixedCostStore = useFixedCostStore();
const { groupCosts } = storeToRefs(fixedCostStore);
const activeIndex = ref(0);

const confirm = useConfirm();
const toast = useToast();

provide("activeIndex", activeIndex);

onMounted(async () => {
  await fixedCostStore.fetch();
});

const confirmDelete = (selectedGroupCost: GroupCostDto) => {
  confirm.require({
    message: `Willst du ${selectedGroupCost.name} wirklich löschen?`,
    header: "Achtung!",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      await useApiStore().GroupcostClient.deleteGroupCostEndpoint(selectedGroupCost.id);

      const tmp = toRaw(groupCosts.value)
      const filteredGroupCosts = tmp.filter((groupCost: GroupCostDto) =>
        groupCost.id != selectedGroupCost.id);
      groupCosts.value = filteredGroupCosts;

      toast.add({
        severity: "info",
        summary: "Erfolgreich!",
        life: 3000,
      });
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Abgebrochen",
        life: 3000,
      });
    },
  });
};
</script>

<style scoped></style>
