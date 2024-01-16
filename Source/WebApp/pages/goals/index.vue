<template>
  <div class="w-1/2">
    <BaseGenericModal :genericModalInput="opsModalInputs" :workObject="testObject" :modalType="ModalType.Create" :actionCall="() => console.log('Erstellt')"/>
  </div>
  {{ testObject }}
</template>

<script setup lang="ts">
import { GenericModalInput } from '~/components/Base/GenericModal.vue';
import { ModalType } from '~/metaData/enums';
const testObject = ref<Ops>({});
const userTest = ref({})

import GenericInput from "@/components/Base/GenericInput.vue"

const opsModalInputs: GenericModalInput[] = [
  { label:"Ops-Kode", component: GenericInput, componentBinding: {bindProperty: "code", type:"text", workObject:testObject, } },
  { label:"Description", component: GenericInput, componentBinding: {bindProperty: "desc", type:"text", workObject:testObject, } },
];

// const userModalInputs: GenericModalInput[] = [
//   { bindProperty: "name", type: "text", lable:"Name" },
//   { bindProperty: "age", type: "number", lable: "Alter" },
// ];

interface Ops {
  code: string;
  desc: string;
}
</script>