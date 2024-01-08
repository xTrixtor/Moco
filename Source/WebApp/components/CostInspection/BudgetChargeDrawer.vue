<template>
  <el-drawer class="!bg-foreground" v-model="drawerVis" :with-header="false">
    <div class="flex flex-1 justify-start flex-col h-3/4">
      <div>
        <Icon name="material-symbols-light:close" size="1.5rem" class="cursor-pointer hover:text-white duration-300 hover:rotate-90 hover:scale-110" @click="handleClose"/>
      </div>
      <CostInspectionChargeTable/>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);

const drawerVis = useVModel(props, "modelValue", emit);

const handleClose = () => {
  drawerVis.value = false;
}


</script>

<style scoped>

.el-overlay{
  @apply !bg-black;
}
</style>
