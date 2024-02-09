<template>
    <div @click="initializeCostInspection" id="addButton" class="grid place-content-center w-96 h-96 rounded-lg border-2 border-dashed border-primary bg-foreground cursor-pointer opacity-30 hover:opacity-100 duration-300 my-4">
      <Icon name="gridicons:add-outline" size="3rem" color="white"/>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { CostInspectionCRequest } from '~/stores/apiClient';
import { useApiStore } from '~/stores/apiStore';
import { useInspectionStore } from '~/stores/costInspectionStore';

const {selectedDate} = storeToRefs(useInspectionStore());

const initializeCostInspection = async() => {
  console.log(selectedDate.value)
    const costInspectionCRequest = {year: selectedDate.value.getFullYear(), monthNumber: selectedDate.value.getMonth()} as CostInspectionCRequest;
    await useApiStore().InspectionClient.createCostInspectionEndpoint(costInspectionCRequest)
    await useInspectionStore().fetch(selectedDate.value.getFullYear(), selectedDate.value.getMonth())
}
</script>

<style scoped></style>
