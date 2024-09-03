<template>
  <div class="grid place-items-center absolute top-0 left-0 h-screen w-full">
    <div
      class="flex flex-col justify-between p-4 border-2 rounded-lg m-2 bg-foreground w-1/2 min-h-[50vh]"
    >
      <div
        @click="handleClose"
        class="h-full w-full flex-center justify-between py-2"
      >
        <p>{{ props.title }}</p>
        <svg
          class="fill-primary text-primary cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="white"
            d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
          />
        </svg>
      </div>
      <div class="border-y-2 py-2 flex-1 border-border">
        <div
          class="flex w-full py-1"
          v-for="(genericProp, key) in props.genericModalInput"
          :key="key"
        >
          <p class="flex flex-1 items-center">{{ genericProp.label }}</p>

          <component
            :is="genericProp.component"
            v-bind="genericProp.componentBinding"
            @inputChange="
              (propName: string, newVal: any) => (editObject[propName] = newVal)
            "
          />
        </div>
      </div>
      <div class="flex w-full justify-end mt-4">
        <Button v-if="props.actionBtnTxt" @click="props.actionCall">{{
          props.actionBtnTxt
        }}</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GenericInputProps } from "./GenericInput.vue";
import { GenericModalInstance } from "../Instance/GenericModal";

export interface GenericModalInput {
  label: string;
  component: Component;
  componentBinding: GenericInputProps;
}

export interface GenericEditModalProps {
  title: string;
  actionBtnTxt?: string;
  genericModalInput: GenericModalInput[];
  workObject: any;
  actionCall: () => void;
}

const props = defineProps<GenericEditModalProps>();
const emit = defineEmits(["inputChange"]);

const editObject = ref(props.workObject);

const handleClose = () => {
  GenericModalInstance.close();
};
</script>

<style scoped></style>
