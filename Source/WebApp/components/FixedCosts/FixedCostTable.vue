<template>
    <div class="flex flex-col px-1 mt-2 mb-4 overflow-auto max-h-[30vh]">
        <div v-if="!props.fixedcosts || props.fixedcosts.length ===0" class="overflow-hidden">
          <p class="text-center">Keine Daten</p>
        </div>
        <div v-else>
          <div v-for="(cost, key) in props.fixedcosts" class="w-full py-1 flex border-b-2 border-slate-500" :class="[key%2?'!bg-indigo-100 border-y-0':'bg-indigo-200', key==0?'rounded-tr-2xl':'']">
            <div :class="cellStyling">
              {{ cost.name }}
            </div>
            
            <div :class="cellStyling" >
              <p class="truncate ...">{{cost.value}} €</p>
            </div>
            <div class="flex flex-1 justify-center items-center">
              <FixedCostsTableActionCell :fixcost="cost"/>
            </div>
          </div>
        </div>
      </div>
</template>

<script setup lang="ts">
import { FixedCostDto } from '~/stores/apiClient';

interface ChargeTableProps{
    fixedcosts: FixedCostDto[]
}

const props = defineProps<ChargeTableProps>();

const cellStyling = "mx-1 w-1/3 flex justify-start text-sm "

</script>

<style scoped>

</style>