<template>
  <div class="flex flex-col p-4 border-2 rounded-lg m-2 bg-foreground">
    <div
      class="flex w-full"
      v-for="(genericProp, key) in props.genericModalInput"
    >
      <p class="flex flex-1 items-center">{{ genericProp.label }}</p>
      
      <component :is="genericProp.component" v-bind="genericProp.componentBinding" @inputChange="(propName:string, newVal:any) => editObject[propName] = newVal"/>
    </div>
    <div class="flex-1 flex w-full justify-end mt-4">
      <Button v-if="props.modalType == ModalType.Edit" @click="props.actionCall"
        >Edit</Button
      >
      <Button
        v-if="props.modalType == ModalType.Create"
        @click="props.actionCall"
        >Create</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalType } from "~/metaData/enums";
import { GenericInputProps } from "./GenericInput.vue";

export interface GenericModalInput {
  label: string;
  component: Component;
  componentBinding: GenericInputProps 
}

interface GenericEditModalProps {
  genericModalInput: GenericModalInput[];
  workObject: any;
  modalType: ModalType;
  actionCall: () => void;
}

const props = defineProps<GenericEditModalProps>();
const emit = defineEmits(["inputChange"]);

const editObject = ref(props.workObject);

const setGenericValue = (propName:string, newValue: any) => {
editObject[propName] = newValue
}

</script>

<style scoped></style>
