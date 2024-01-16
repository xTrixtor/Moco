<template>
  <Sidebar v-model:visible="drawerVis" position="right">
    <div class="flex flex-1 justify-start flex-col h-3/4">
      <CostInspectionChargeTable/>
    </div>
  </Sidebar>
</template>

<script setup lang="ts">
import Sidebar from 'primevue/sidebar';
const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);

const drawerVis = useVModel(props, "modelValue", emit);

</script>

<style scoped>

.el-overlay{
  @apply !bg-black;
}
</style>
