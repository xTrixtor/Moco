<template>
    <el-dialog
      v-if="modelValue"
      v-model="props.modelValue"
      :title="'Hinzufügen eines Budgets'"
      width="30%"
      :before-close="handleClose"
    >
      <div class="w-full h-full bg-slate-50 py-4 px-1 rounded-lg">
        <div class="flex items-center">
          <p class="w-1/2">Name</p>
          <BaseCustomInput
            v-model="createBudgetDto.name"
            type="text"
            placeholder="Name"
            :clearable="true"
          />
        </div>
        <div class="flex">
          <p class="w-1/2 flex items-center">Limit</p>
          <BaseCustomInput
            v-model="createBudgetDto.limit"
            type="number"
            placeholder="Limit"
            :clearable="true"
          />
        </div>
        <div
          class="flex flex-row-reverse justify-between"
        >
          <div
            class="w-8 h-8 flex items-center justify-center rounded-full mt-2 bg-indigo-700 border-2 border-violet-900 hover:-translate-y-1 duration-300 hover:shadow-indigo-400 shadow-lg hover:cursor-pointer hover:bg-indigo-600 hover:scale-110"
          >
            <Icon
              name="material-symbols:save-outline"
              class="text-white w-full h-full p-1"
              @click="handleCreateCharge()"
            />
          </div>
        </div>
      </div>
    </el-dialog>
  </template>
  
  <script setup lang="ts">
  import {
BudgetDto,
    CBudgetRequest,

  } from "~/stores/apiClient";
  import { useApiStore } from "~/stores/apiStore";
  import { useBudgetStore } from "~/stores/budgetStore";
  
  interface AddChargeModalProps {
    modelValue: boolean;
  }
  interface BudgetCDto {
    name?:string;
    limit?: number;
  }
  
  const props = defineProps<AddChargeModalProps>();
  const emit = defineEmits(["update:modelValue"]);
  
  const data = useVModel(props, "modelValue", emit);
  const createBudgetDto = reactive<BudgetCDto>({});
  

  const handleCreateCharge = async () => {
    await useApiStore().BudgetClient.createBudgetEndpoint({
      budget: createBudgetDto,
    } as CBudgetRequest);
    await useBudgetStore().fetch();
    data.value = false;
  };

  onKeyStroke("Enter", async (e) => {
    if(props.modelValue)
      await handleCreateCharge();
  });

  onKeyStroke("Esc", async (e) => {
    data.value = false;
  });

  const handleClose = () => {
    data.value = false;
  };
  </script>
  
  <style>
  .el-dialog__body {
    @apply px-4 py-2;
  }
  
  </style>
  