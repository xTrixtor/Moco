<template>
  <div class="flex flex-col h-full w-full p-4">
    <p class="text-xl text-primary underline underline-offset-4">
      Fixkosten pro Monat 
    </p>
    <Accordion v-if="groupCosts.length != 0" v-model:activeIndex="activeIndex">
      <AccordionTab
        v-for="(groupCost, key) in groupCosts"
        :key="key"
        :header="groupCost.name"
        :pt="{ content: { class: 'justify-center items-center' } }"
      >
        <FixedCostTable :fixedcosts="groupCost.fixedCosts ?? []" />
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

const fixedCostStore = useFixedCostStore();
const { groupCosts } = storeToRefs(fixedCostStore);
const activeIndex = ref(0)

provide("activeIndex", activeIndex)

onMounted(async () => {
  await fixedCostStore.fetch();
});
</script>

<style scoped></style>
