<template>
  <Sidebar v-model:visible="drawerVis" position="right" class="h-screen">
    <CostInspectionChargeTable />
  </Sidebar>
</template>

<script setup lang="ts">
import Sidebar from "primevue/sidebar";
const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);

const drawerVis = useVModel(props, "modelValue", emit);
</script>

<style scoped>
.el-overlay {
  @apply !bg-black;
}
</style>
