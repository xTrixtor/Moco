<template>
  <el-dialog
    v-if="props.modelValue"
    v-model="props.modelValue"
    :title="'Bearbeitung von: ' + props.fixedcost.name"
    width="30%"
    :before-close="handleClose"
  >
    <div class="w-full h-full bg-slate-50 py-4 px-1 rounded-lg">
      <div class="flex">
        <p class="w-1/2">Name</p>
        <BaseCustomInput
          v-model="fixedCostUDto.name"
          type="text"
          :placeholder="props.fixedcost.name"
        />
      </div>
      <div class="flex">
        <p class="w-1/2">Kosten</p>
        <BaseCustomInput
          v-model="fixedCostUDto.value"
          type="number"
          :placeholder="props.fixedcost.value"
        />
      </div>
      <div class="flex">
        <p class="w-1/2">Time-Interval</p>
        <el-select
          v-model="fixedCostUDto.timeInterval"
          class="m-2 w-full"
          :placeholder="TimeInterval[+props.fixedcost.timeInterval]"
        >
          <el-option
            v-for="(item, key) in createTimeIntervalSelectOptions()"
            :key="key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="flex flex-row-reverse justify-between" v-if="calculatedMontlyChargeCost || calculatedMontlyChargeCost == 0">
        <div 
            class="w-10 h-10 flex items-center justify-center rounded-full mt-2"
            :class="!isDirty?' bg-slate-300 !cursor-not-allowed duration-500 ' :' bg-indigo-700 border-2 border-violet-900 hover:-translate-y-1 duration-300 hover:shadow-indigo-400 shadow-lg hover:cursor-pointer hover:bg-indigo-600'"
            >
            <Icon name="material-symbols:save-outline" class="text-white w-full h-full p-1" @click="handleUpdateCharge()" />
        </div>
        <p v-if="fixedCostUDto.timeInterval != TimeInterval.Monatlich" class="font-bold my-1 flex-center">
          Monatliche Kosten: {{ calculatedMontlyChargeCost }} €
        </p>
      </div>
      <div v-else>
        <Icon name="eos-icons:bubble-loading" size="1.5rem" />
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ChargeDto, FixedCostDto, FixedCostUDto, TimeInterval } from "~/stores/apiClient";
import { useApiStore } from "~/stores/apiStore";
import { useFixedCostStore } from "~/stores/fixedCostStore";

interface ChargeCardProps {
  modelValue: boolean;
  fixedcost: FixedCostDto;
}
interface SelectOption {
  label: string;
  value: TimeInterval;
}


const props = defineProps<ChargeCardProps>();
const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emit);
const fixedCostUDto = reactive<FixedCostUDto>({...props.fixedcost})
const isDirty = ref(false)
const calculatedMontlyChargeCost = computed<number | undefined>(
  () => calculateMontlyChargeCost(fixedCostUDto.timeInterval, fixedCostUDto.value));

const handleUpdateCharge = async() => {
    await useApiStore().FixedcostClient.updateFixedCostEndpoint(fixedCostUDto)
    await useFixedCostStore().fetch();
    data.value = false;
}


const createTimeIntervalSelectOptions = (): SelectOption[] => {
  const allKeys = Object.keys(TimeInterval).filter((item) => {
    return !isNaN(Number(item)) && Number(item) != 0;
  });

  return allKeys.map((key) => {
    return { label: TimeInterval[+key], value: +key } as SelectOption;
  });
};

onKeyStroke("Esc", async (e) => {
  data.value = false;
});

const handleClose = () => {
  data.value = false;
};

watchDeep(fixedCostUDto, (newVal) => {
    isDirty.value = isDirtyCalc(newVal as ChargeDto);
})

const isDirtyCalc = (newCharge:ChargeDto): boolean => {
    let isDirty = false;
    const compareProperties = ["name", "value", "timeInterval"]
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
