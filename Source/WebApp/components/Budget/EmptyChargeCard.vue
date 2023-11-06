<template>
    <div class="flex flex-col bg-brand p-1 h-[400px] rounded-sm">
        <BudgetChargeAddHeader :add-charge="handleAddCharge" :time-interval="props.timeInterval"/>
        <el-table
        :data="charges"
        style="width: 100%"
        show-summary
        :summary-method="getSummaries"
      >
      <el-table-column
        v-for="(tschema, key) in TableSchema"
        :prop="tschema.Property"
        :label="tschema.Name"
      />
      </el-table>
    </div>
</template>

<script setup lang="ts">
import { TableColumnCtx } from 'element-plus';
import { ChargeDto, TimeInterval } from '~/stores/apiClient';
import { useChargeStore } from '~/stores/chargeStore';

interface EmptyChargeCardProps{
    timeInterval: string
}
const props = defineProps<EmptyChargeCardProps>()

const charges = ref<ChargeDto[]>([])

const handleAddCharge = (charge:ChargeDto) => {
    useChargeStore().addCharge(charge);
}
interface TableSchema {
  Property: string;
  Name: string;
}
const TableSchema: TableSchema[] = [
  { Property: "chargeName", Name: "Name" },
  { Property: "value", Name: "Kosten in €" },
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
          return useCeil(prev + curr,2);
        } else {
          return useCeil(prev,2);
        }
      }, 0)} €`;
    } else {
      sums[index] = "Failed";
    }
  });
  return sums.slice(0, 2);
};

</script>
