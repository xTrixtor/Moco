<template>
  <div class="flex flex-col px-1 mt-2 overflow-auto max-h-[30vh] lg:h-full lg:max-h-full">
    <div
      v-if="!props.fixedcosts || props.fixedcosts.length === 0 && props.groupCost.name !='Sparziel'"
      class="overflow-hidden flex-center flex-col"
    >
      <p class="text-center underlineAnimation w-1/2 text-highlight-text">
        Keine Daten
      </p>
      <div
        id="addButton"
        class="w-full py-1 flex-center opacity-70 hover:opacity-100"
        @click="() => (addFixedCostModalVis = true)"
      >
        <Icon
          name="gridicons:add-outline"
          class="ml-2 text-xl duration-500 text-white"
        />
      </div>
    </div>
    <div v-else>
      <div
        v-if="props.fixedcosts"
        v-for="(cost, key) in props.fixedcosts"
        :key="key"
        class="w-full py-1 flex border-b-2 border-border text-highlight-text"
        :class="[key == 0 ? 'rounded-tr-2xl' : '']"
      >
        <div class="w-1/2 lg:w-[60%]" :class="cellStyling">
          <p class="truncate flex-1 text-xs lg:text-base flex items-center">{{ cost.name }}</p>
        </div>

        <div class="w-[25%] flex-1 text-xs lg:text-base flex items-center" :class="cellStyling">
          <p class="truncate flex-1">{{ calculateMontlyChargeCost(cost) }} €</p>
        </div>
        <div class="flex justify-center items-center">
          <TableActionCell
            v-if="cost"
            :unique-key="`${cost.id}-${cost.name}-${key}`"
            :dto="cost"
            label="diese Kosten"
            :delete-api-call="() => deleteFixedcostById(cost.id ?? 0)"
            :edit-modal-type="EditModalType.FixedCost"
            :exclude-action="props.groupCost.name=='Sparziel'?ModalType.Edit:undefined"
          />
        </div>
      </div>
      <div
        v-if="props.groupCost.name !='Sparziel'"
        id="addButton"
        class="w-full my-2 flex-center opacity-70 hover:opacity-100"
        @click="() => (addFixedCostModalVis = true)"
      >
        <Icon
          name="gridicons:add-outline"
          class="text-xl duration-500 text-white"
        />
      </div>
    </div>
  </div>
  <AddFixedCostModal v-model="addFixedCostModalVis" />
</template>

<script setup lang="ts">
import { FixedCostDto, GroupCostDto } from "~/stores/apiClient";
import { cellStyling } from "~/metaData/styling";
import TableActionCell from "./TableActionCell.vue";
import { useApiStore } from "~/stores/apiStore";
import { useFixedCostStore } from "~/stores/fixedCostStore";
import { EditModalType, ModalType } from "@/metaData/enums";
import AddFixedCostModal from "./AddFixedCostModal.vue";
import { useOverviewCostStore } from "~/stores/overviewCostStore";

interface ChargeTableProps {
  groupCost: GroupCostDto;
  fixedcosts: FixedCostDto[];
}

const apiStore = useApiStore();

const props = defineProps<ChargeTableProps>();
const addFixedCostModalVis = ref(false);
const deleteFixedcostById = async (id: number) => {
  await apiStore.FixedcostClient.deleteFixedCostEndpoint(id);
  await useFixedCostStore().fetch();
  await useOverviewCostStore().calulateCostOverview();
};
</script>

<style scoped></style>
