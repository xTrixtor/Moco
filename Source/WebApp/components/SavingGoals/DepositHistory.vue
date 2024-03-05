<template>
    <div class="h-full bg-primary overflow-auto bg-violet-50">
        <div class="flex w-full gap-6">
            <p class="w-1/3">Monat-Jahr</p>
            <p>Rate</p>
        </div>
        <div v-for="depositRate in props.savingGoal.depositRates" class="flex w-full gap-6">
            <p class="w-1/3">{{ depositRate.key }}</p>
            <p>{{ depositRate.value }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { SavingGoalDto } from '~/stores/apiClient';

export interface DepositHistoryProps{
    savingGoal: SavingGoalDto;
}
const props = defineProps<DepositHistoryProps>();
console.log(props.savingGoal)
</script>

<style scoped>

</style>