<template>
  <div
    class="bg-card max-h-[50vh] min-h-[5vh] w-full md:w-[300px] ring-2 ring-border rounded-lg rounded-bl-[2rem] rounded-tr-[2rem] my-2 shadow-lg shadow-slate-400 hover:ring-offset-2 hover:ring-primary duration-200 cursor-pointer"
    @click="fixedCostStore.setSelectedGroupCost(props.groupCost)"
    >
    <div class="flex-center border-b-2">
      <p class="ml-2 text-lg flex-1 text-white">{{ props.groupCost.name }}</p>
      <Button @click="confirmDelete" raised text :pt="{root:{class:'p-1'}}" class="mr-4 my-2">
        <Icon
        class="flex justify-center items-center cursor-pointer duration-300 w-8 opacity-70 hover:opacity-100 !text-red-600"
        size="1.5rem"
        name="line-md:cancel"
        id="deleteIcon"
      />
      </Button>
    </div>
    <FixedCostTable :fixedcosts="props.groupCost.fixedCosts ?? []" />
  </div>
</template>

<script setup lang="ts">
import { ChargeDto, GroupCostDto } from "~/stores/apiClient";
import FixedCostTable from "./FixedCostTable.vue";
import { useApiStore } from "~/stores/apiStore";
import { useFixedCostStore } from "~/stores/fixedCostStore";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();
interface GroupCostCard {
  groupCost: GroupCostDto;
  key:number;
}

const props = defineProps<GroupCostCard>();
provide("groupCost", props.groupCost)
const fixedCostStore = useFixedCostStore();
const target = ref(null)
onClickOutside(target,() => fixedCostStore.setSelectedGroupCost({}))

const confirmDelete = () => {
  confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: async() => {
            await deleteGroupCost()
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });

};

const deleteGroupCost = async () =>{
  await useApiStore().GroupcostClient.deleteGroupCostEndpoint(
        props.groupCost.id
      );
      await fixedCostStore.fetch();
}
</script>
<style></style>
