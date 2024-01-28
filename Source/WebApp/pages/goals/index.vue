<template>
    <!-- <BaseGenericModal
      :genericModalInput="opsModalInputs"
      :workObject="testObject"
      :modalType="ModalType.Create"
      :actionCall="() => console.log('Erstellt')"
    /> -->
  <div @click="handleClick" class="p-4 bg-primary">Open</div>
  <Icon name="ic:baseline-close" size="2rem" />
</template>

<script setup lang="ts">
import { GenericEditModalProps, GenericModalInput } from "~/components/Base/GenericModal.vue";
import { ModalType } from "~/metaData/enums";
import { createApp } from "vue";
import GenericInput from "@/components/Base/GenericInput.vue";
import PrimaryButton from "~/components/Base/PrimaryButton.vue";
import { GenericModalInstance } from "~/components/Instance/GenericModal";

const testObject = ref<Ops>({});
const userTest = ref({});

const opsModalInputs: GenericModalInput[] = [
  {
    label: "Ops-Kode",
    component: GenericInput,
    componentBinding: {
      bindProperty: "code",
      type: "text",
      workObject: testObject,
    },
  },
  {
    label: "Description",
    component: GenericInput,
    componentBinding: {
      bindProperty: "desc",
      type: "text",
      workObject: testObject,
    },
  },
];

// const userModalInputs: GenericModalInput[] = [
//   { bindProperty: "name", type: "text", lable:"Name" },
//   { bindProperty: "age", type: "number", lable: "Alter" },
// ];

interface Ops {
  code: string;
  desc: string;
}

const handleClick = () => {
  const props : GenericEditModalProps = {title:"Edit-Modal",workObject: testObject, actionBtnTxt:"Create", actionCall: () => console.log('Erstellt'), genericModalInput:opsModalInputs}
  GenericModalInstance.open(props);
};

</script>