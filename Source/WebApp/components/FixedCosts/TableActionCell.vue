<template>
    <div class="flex justify-end items-center">
        <Icon v-if="props.editModalType !== undefined" class="flex justify-center items-center cursor-pointer text-green-600 duration-300 mr-1 opacity-60 hover:opacity-100" size="1.5rem" name="ant-design:edit-outlined" @click="() => (modalVis = true)"/>
        <Icon class="flex justify-center items-center cursor-pointer text-red-600 duration-300 mr-1 opacity-60 hover:opacity-100" size="1.5rem" name="material-symbols:delete-outline" @click="confirmDelete"/>
    </div>
    <FixedCostsEditModal v-if="props.editModalType === EditModalType.FixedCost" :unique-key="props.uniqueKey" :key="props.uniqueKey" v-model="modalVis" :fixedcost="props.dto"/>
</template>

<script setup lang="ts">
import { EditModalType } from '~/metaData/enums';

interface SpecialCellProps{
    uniqueKey:string
    dto:any;
    label:string;
    deleteApiCall: () => void;
    editModalType?: EditModalType
}

const props = defineProps<SpecialCellProps>()
const modalVis = ref(false);


const confirmDelete = () =>{
    ElMessageBox.confirm(
    `Willst du ${props.label} wirklich löschen?`,
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Schließen',
      type: 'warning',
    }
  )
    .then(async() => {
        await props.deleteApiCall();
      ElMessage({
        type: 'success',
        message: 'Erfolgreich gelöscht',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Löschen abgebrochen',
      })
    })
}

</script>

<style>

</style>