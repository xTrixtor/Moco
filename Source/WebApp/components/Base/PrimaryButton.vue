<template>
  <button
    :disabled="props.disabled"
    class="bg-primary px-4 py-2 text-white rounded-sm shadow-sm border-2 border-gray-300"
    :class="[
      props.disabled ? ' bg-slate-300 cursor-not-allowed duration-500 ' : '',
      props.styling ? props.styling : '',
    ]"
    @click="$props.onClick()"
  >
    {{ props.btnTxt }}
  </button>
</template>

<script setup lang="ts">
interface ButtonProps {
  btnTxt: string;
  onClick?: any;
  styling?: string;
  disabled?: boolean;
}
const props = defineProps<ButtonProps>();
</script>

<style scoped></style>
