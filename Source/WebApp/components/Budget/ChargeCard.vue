<template>
    <div class="flex flex-col bg-brand p-1 h-[400px] rounded-sm">
      {{ props.smartIntervalKey.intervalString }}
      <BudgetChargeDataGrid :charges="props.charges" :time-interval-key="smartIntervalKey.timeIntervalKey"/>
    </div>
</template>

<script setup lang="ts">
import { SmartIntervalKey } from '~/pages/budget/index.vue';
import { ChargeDto } from '~/stores/apiClient';

interface ChargeColumnProps{
    smartIntervalKey: SmartIntervalKey
    charges: ChargeDto[]
}

const props = defineProps<ChargeColumnProps>()

</script>
