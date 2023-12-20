<template>
    <el-dialog
      v-if="props.modelValue"
      v-model="props.modelValue"
      :title="'Bearbeitung von: ' + props.budgetDto.name"
      width="30%"
      :before-close="handleClose"
    >
      <div class="w-full h-full bg-slate-50 py-4 px-1 rounded-lg">
        <div class="flex">
          <p class="w-1/2">Name</p>
          <BaseCustomInput
            v-model="budgetUDto.name"
            type="text"
            :placeholder="budgetUDto.name"
          />
        </div>
        <div class="flex">
          <p class="w-1/2">Kosten</p>
          <BaseCustomInput
            v-model="budgetUDto.limit"
            type="number"
            :placeholder="budgetUDto.limit"
          />
        </div>
        <div class="flex flex-row-reverse justify-between">
          <div 
              class="w-10 h-10 flex items-center justify-center rounded-full mt-2"
              :class="!isDirty?' bg-slate-300 !cursor-not-allowed duration-500 ' :' bg-indigo-700 border-2 border-violet-900 hover:-translate-y-1 duration-300 hover:shadow-indigo-400 shadow-lg hover:cursor-pointer hover:bg-indigo-600'"
              >
              <Icon name="material-symbols:save-outline" class="text-white w-full h-full p-1" @click="handleUpdateCharge()" />
          </div>
        </div>
      </div>
      {{ props.budgetDto }}
    </el-dialog>
  </template>
  
  <script setup lang="ts">
  import { BudgetDto } from "~/stores/apiClient";
  import { useApiStore } from "~/stores/apiStore";
  import { useFixedCostStore } from "~/stores/fixedCostStore";
  
  interface ChargeCardProps {
    modelValue: boolean;
    budgetDto: BudgetDto;
  }
  const props = defineProps<ChargeCardProps>();
  const emit = defineEmits(["update:modelValue"]);
  
  const data = useVModel(props, "modelValue", emit);
  const budgetUDto = reactive<BudgetDto>({...props.budgetDto})
  const isDirty = ref(false)
  
  const handleUpdateCharge = async() => {
      await useApiStore().FixedcostClient.updateFixedCostEndpoint(budgetUDto)
      await useFixedCostStore().fetch();
      data.value = false;
  }

  onKeyStroke("Esc", async (e) => {
    data.value = false;
  });
  
  const handleClose = () => {
    data.value = false;
  };
  
  watchDeep(budgetUDto, (newVal) => {
      isDirty.value = isDirtyCalc(newVal as BudgetDto);
  })
  
  const isDirtyCalc = (newCharge:BudgetDto): boolean => {
      let isDirty = false;
      const compareProperties = ["name", "limit"]
      compareProperties.forEach(prop => {
          if(newCharge[prop] != props.fixedcost[prop]){
              isDirty = true;
          }
      });
      return isDirty;
  }
  </script>
  
  <style>
  .el-dialog__body{
    @apply px-4 py-2;
  }
  </style>
  