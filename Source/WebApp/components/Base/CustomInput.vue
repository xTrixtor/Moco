import { mergeProps } from 'nuxt/dist/app/compat/capi';
<template>
  <div class="w-full flex flex-col">
    <div class="flex-center relative">
      <input
        class="border-2 p-2 border-b-2 border-t-0 border-x-0 rounded-sm w-full bg-transparent font-semibold outline-none focus:border-b-primary flex-1 text-white"
        :class="props.styling"
        :placeholder="props.placeholder"
        @input="handleInputChange"
        :type="props.type"
        :value="props.modelValue"
      />
      <div
        v-if="props.clearable"
        class="w-8 h-full text-xl flex-center text-zinc-400 absolute right-0"
        v-tooltip="'Löschen'"
          placeholder="Right"
      >
        <Icon
          name="mdi:clear-circle-outline"
          class="cursor-pointer hover:text-zinc-500 duration-300 outline-none"
          @click="handleClearInputClick"
        />
      </div>
    </div>
    <p v-if="error" class="text-sm mt-2 text-red-600 mx-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
type TextInputProps = {
  modelValue: string;
  placeholder: string;
  error?: any;
  type: string;
  styling?: string;
  clearable?: boolean;
};

const props = defineProps<TextInputProps>();
const emit = defineEmits(["update:modelValue", "changed"]);

const handleInputChange = (e: any) => {
  emit("update:modelValue", e.target.value);
};

const handleClearInputClick = (e: any) => {
  emit("update:modelValue", undefined);
};
</script>

<style scoped>
input:focus-visible::after {
  outline: 2px solid crimson;
  border-radius: 3px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
