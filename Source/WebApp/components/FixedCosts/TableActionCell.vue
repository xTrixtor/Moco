<template>
  <div class="flex justify-end items-center">
    <Icon
      v-if="props.editModalType !== undefined && props.excludeAction != ModalType.Edit"
      class="flex justify-center items-center cursor-pointer text-green-600 duration-300 mr-1 opacity-60 hover:opacity-100"
      size="1.5rem"
      name="ant-design:edit-outlined"
      @click="() => (modalVis = true)"
    />
    <Icon
      class="flex justify-center items-center cursor-pointer text-red-600 duration-300 mr-1 opacity-60 hover:opacity-100"
      size="1.5rem"
      name="material-symbols:delete-outline"
      @click="confirmDelete"
    />
  </div>
  <FixedCostsEditModal
    v-if="props.editModalType === EditModalType.FixedCost && props.excludeAction != ModalType.Edit"
    :unique-key="props.uniqueKey"
    :key="props.uniqueKey"
    v-model="modalVis"
    :fixedcost="props.dto"
  />
</template>

<script setup lang="ts">
import { EditModalType, ModalType } from "~/metaData/enums";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

interface SpecialCellProps {
  uniqueKey: string;
  dto: any;
  label: string;
  deleteApiCall: () => void;
  editModalType?: EditModalType;
  excludeAction?: ModalType
}

const props = defineProps<SpecialCellProps>();
const modalVis = ref(false);

const confirm = useConfirm();
const toast = useToast();

const confirmDelete = () => {
  confirm.require({
    message: `Willst du ${props.label} wirklich löschen?`,
    header: "Achtung!",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      await props.deleteApiCall();
      toast.add({
        severity: "info",
        summary: "Erfolgreich!",
        life: 3000,
      });
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Abgebrochen",
        life: 3000,
      });
    },
  });
};
</script>

<style></style>
