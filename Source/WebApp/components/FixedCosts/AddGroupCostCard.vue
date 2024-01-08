<template>
  <div
    @click="() => showAutoCompleteField = true"
    class="h-[70px] w-full md:w-[300px] bg-gradient-to-r from-white to-secondary-content rounded-lg flex-center my-2 cursor-pointer border-dashed border-2 duration-300 border-primary opacity-30 hover:opacity-100"
    id="addButton"
  >
    <el-tooltip
      v-if="showAutoCompleteField"
      content="Enter hinzufügen oder Esc schließen"
      placement="right"
    >
      <FixedCostsAddGroupCostButton v-model="showAutoCompleteField" />
    </el-tooltip>
    <Icon
      v-else
      name="gridicons:add-outline"
      class="ml-2 text-2xl duration-500"
    />
  </div>
</template>

<script setup lang="ts">
const showAutoCompleteField = ref(false);
</script>

<style scoped></style>
