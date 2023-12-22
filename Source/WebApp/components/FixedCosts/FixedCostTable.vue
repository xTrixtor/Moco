<template>
  <div class="flex flex-col px-1 mt-2 mb-4 overflow-auto max-h-[30vh]" >
    <div
      v-if="!$props.fixedcosts || props.fixedcosts.length === 0"
      class="overflow-hidden"
    >
      <p class="text-center">Keine Daten</p>
    </div>
    <div v-else>
      <div
        v-for="(cost, key) in props.fixedcosts"
        :key="key"
        class="w-full py-1 flex border-b-2 border-slate-500"
        :class="[
          key % 2 ? '!bg-indigo-100 border-y-0' : 'bg-indigo-200',
          key == 0 ? 'rounded-tr-2xl' : '',
        ]"
      >
        <div class="w-[60%]" :class="cellStyling">
          <p class="truncate flex-1">{{ cost.name }}</p>
        </div>

        <div class="w-[25%] flex-1" :class="cellStyling">
          <p class="truncate flex-1">{{ calculateMontlyChargeCost(cost) }} €</p>
        </div>
        <div class="flex justify-center items-center">
          <TableActionCell :unique-key="`${cost.id}-${cost.name}-${key}`" :dto="cost" label="diese Kosten" :delete-api-call="() => deleteFixedcostById(cost.id)" :edit-modal-type="EditModalType.FixedCost" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FixedCostDto } from "~/stores/apiClient";
import { cellStyling } from "~/metaData/styling";
import TableActionCell from "./TableActionCell.vue"
import { useApiStore } from "~/stores/apiStore";
import { useFixedCostStore } from "~/stores/fixedCostStore";
import { EditModalType } from '~/metaData/enums';

interface ChargeTableProps {
  fixedcosts: FixedCostDto[];
}

const apiStore = useApiStore();

const props = defineProps<ChargeTableProps>()

const deleteFixedcostById = async (id: number) => {
    await apiStore.FixedcostClient.deleteFixedCostEndpoint(id)
    await useFixedCostStore().fetch();
}
</script>

<style scoped></style>
 
