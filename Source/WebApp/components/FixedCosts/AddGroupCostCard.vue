<template>
  <div
    id="addButton"
    @click="() => showAutoCompleteField = true"
    class="h-[50px] w-full rounded-lg flex-center my-2 cursor-pointer border-dashed border-2 duration-300 border-primary opacity-30 hover:opacity-100"
  >
    <FixedCostsAddGroupCostButton v-if="showAutoCompleteField" v-model="showAutoCompleteField" />
    <Icon
      v-else
      name="gridicons:add-outline"
      class="ml-2 text-2xl duration-500 text-highlight-text"
    />
  </div>
</template>

<script setup lang="ts">
const showAutoCompleteField = ref(false);
</script>

<style scoped></style>
