<template>
    <div class="w-full flex justify-end items-center">
        <Icon class="flex justify-center items-center cursor-pointer text-green-600 hover:!text-green-400 duration-300 mr-1" size="1.5rem" name="ant-design:edit-outlined" @click="() => (modalVis = true)"/>
        <Icon class="flex justify-center items-center cursor-pointer text-red-600 hover:!text-red-400 duration-300 mr-1" size="1.5rem" name="material-symbols:delete-outline" @click="confirmDelete"/>
    </div>
    <FixedCostsEditModal v-model="modalVis" :fixedcost="props.fixcost"/>
</template>

<script setup lang="ts">
import {  FixedCostDto } from '~/stores/apiClient';
import { useApiStore } from '~/stores/apiStore';
import { useFixedCostStore } from '~/stores/fixedCostStore';


interface SpecialCellProps{
    fixcost: FixedCostDto
}

const props = defineProps<SpecialCellProps>()
const modalVis = ref(false);

const apiStore = useApiStore();

const confirmDelete = () =>{
    ElMessageBox.confirm(
    'Willst du diese Kosten wirklich löschen?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Schließen',
      type: 'warning',
    }
  )
    .then(async() => {
        await apiStore.FixedcostClient.deleteFixedCostEndpoint(props.fixcost.id)
        await useFixedCostStore().fetch();
      ElMessage({
        type: 'success',
        message: 'Erfolgreich gelöscht',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Leider ist beim Löschen etwas schief gelaufen',
      })
    })
}
</script>

<style>

</style>