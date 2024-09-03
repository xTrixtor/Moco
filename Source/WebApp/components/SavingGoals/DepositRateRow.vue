<template>
  <div class="flex w-full">
    <p class="w-1/3">{{ props.depositRate.key }}</p>
    <p>{{ props.depositRate.value }}</p>
    <div>
      <Icon name="material-symbols:check" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DepositRateDto } from "~/stores/apiClient";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";

interface DepositRateRowProps {
  depositRate: DepositRateDto;
}
const props = defineProps<DepositRateRowProps>();
</script>

<style scoped></style>
