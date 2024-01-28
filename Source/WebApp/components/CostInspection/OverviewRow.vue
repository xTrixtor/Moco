<template>
  <div class="bg-background/10 w-full  mb-2">
    <Button @click="toggle" outlined size="small" class="h-6">{{ creditSum }} €</Button>
  </div>

  <OverlayPanel ref="op" class="w-96">
    <DataTable :value="selectedCostInspection.credits">
      <Column field="name" header="Name"></Column>
      <Column field="value" header="Wert"></Column>
      <template #footer >
        <AddInlineCredit/>
      </template>
    </DataTable>
  </OverlayPanel>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { CreditDto } from "~/stores/apiClient";
import { useInspectionStore } from "~/stores/costInspectionStore";

const { selectedCostInspection } = storeToRefs(useInspectionStore());

const creditSum = computed(() =>
  useSumBy(selectedCostInspection.value.credits, function (c: CreditDto) {
    return c.value;
  })
);

import { ref } from "vue";
import AddInlineCredit from "./AddInlineCredit.vue";

const op = ref();

const uxtApp = useNuxtApp().create

const toggle = (event) => {
  op.value.toggle(event);
};
</script>

<style scoped></style>
