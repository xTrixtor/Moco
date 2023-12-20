<template>
  <el-dialog
    v-model="props.modelValue"
    :title="props.interval + ' Kosten'"
    width="50%"
    :before-close="handleClose"
  >
    <el-table
      :data="props.charges"
      style="width: 100%"
      max-height="350"
      show-summary
      :summary-method="getSummaries"
    >
      <el-table-column
        v-for="(tschema, key) in TableSchema"
        :prop="tschema.Property"
        :label="tschema.Name"
      />
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="data = false">Schließen</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ChargeDto } from "~/stores/apiClient";
import type { TableColumnCtx } from "element-plus";

interface ChargeCardProps {
  modelValue: boolean;
  interval: string;
  charges: ChargeDto[];
}
const props = defineProps<ChargeCardProps>();
const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emit);

onKeyStroke("Esc", async (e) => {
  data.value = false;
});

const handleClose = () => {
  data.value = false;
};

interface TableSchema {
  Property: string;
  Name: string;
}
const TableSchema: TableSchema[] = [
  { Property: "chargeName", Name: "Name" },
  { Property: "value", Name: "Kosten" },
];

interface SummaryMethodProps<T = ChargeDto> {
  columns: TableColumnCtx<T>[];
  data: T[];
}

const getSummaries = (param: SummaryMethodProps) => {
  const { columns, data } = param;
  const sums: string[] = [];
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = "Summe";
      return;
    }
    const values = data.map((item) => Number(item.value));
    if (!values.every((value) => Number.isNaN(value))) {
      sums[index] = `${values.reduce((prev, curr) => {
        const value = Number(curr);
        if (!Number.isNaN(value)) {
          return prev + curr;
        } else {
          return prev;
        }
      }, 0)} €`;
    } else {
      sums[index] = "N/A";
    }
  });
  return sums.slice(0, 2);
};
</script>

<style scoped></style>
