<template>
    <Dialog
      v-model:visible="data"
      modal 
      :header="'Bearbeitung von: ' + props.fixedcost.name"
      :closable="true"
      class=""
    >
      <div class="w-full h-full py-4 px-1 rounded-lg">
        <div class="flex-center">
          <p class="w-1/2">Name</p>
          <BaseCustomInput
            v-model="fixedCostUDto.name"
            type="text"
            :placeholder="fixedCostUDto.name"
            :clearable="true"
          />
        </div>
        <div class="flex-center">
          <p class="w-1/2">Kosten</p>
          <BaseCustomInput
            v-model="fixedCostUDto.value"
            type="number"
            :placeholder="fixedCostUDto.value"
            :clearable="true"
          />
        </div>
        <div class="flex-center">
          <p class="w-1/2">Time-Interval</p>
          <Dropdown :pt="{input:{class:'p-3'}}" v-model="fixedCostUDto.timeInterval" :options="createTimeIntervalSelectOptions()" option-label="label" option-value="value" placeholder="Auswählen" class="text-xs m-2"/>
        </div>
        <div
          class="flex flex-row-reverse justify-between"
          v-if="props.fixedcost.value != 0"
        >
          <div
            class="w-8 h-8 flex items-center justify-center rounded-full mt-2"
            :class="
              !isDirty
                ? ' bg-slate-300 !cursor-not-allowed duration-500 '
                : ' bg-secondary border-2 border-border hover:-translate-y-1 duration-300 hover:shadow-indigo-400 shadow-lg hover:cursor-pointer hover:bg-secondary-light'
            "
          >
            <Icon
              name="material-symbols:save-outline"
              class="text-white"
              @click="handleUpdateCharge()"
              size="1.5rem"
            />
          </div>
          <p
            v-if="(fixedCostUDto.timeInterval != TimeInterval.Monatlich) && monthlyCost != 0"
            class="font-bold my-1 flex-center"
          >
            Monatliche Kosten: ~{{ monthlyCost }} €
          </p>
        </div>
        <div v-else>
          <Icon name="eos-icons:bubble-loading" size="1.5rem" />
        </div>
      </div>
    </Dialog>
</template>

<script setup lang="ts">
import {
  ChargeDto,
  FixedCostDto,
  FixedCostUDto,
  TimeInterval,
} from "~/stores/apiClient";
import { useApiStore } from "~/stores/apiStore";
import { useFixedCostStore } from "~/stores/fixedCostStore";
import { useOverviewCostStore } from "~/stores/overviewCostStore";
interface ChargeCardProps {
  modelValue: boolean;
  fixedcost: FixedCostDto;
  uniqueKey: string;
}
interface SelectOption {
  label: string;
  value: TimeInterval;
}
const target = ref();
const props = defineProps<ChargeCardProps>();
const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emit);
let fixedCostUDto = ref<FixedCostUDto>({...props.fixedcost});
const isDirty = ref(false);
const monthlyCost = ref(calculateMontlyChargeCost(props.fixedcost))

const handleUpdateCharge = async () => {
  await useApiStore().FixedcostClient.updateFixedCostEndpoint(fixedCostUDto.value);
  await useFixedCostStore().fetch();
  await useOverviewCostStore().calulateCostOverview();
  data.value = false;
};

const createTimeIntervalSelectOptions = (): SelectOption[] => {
  const allKeys = Object.keys(TimeInterval).filter((item) => {
    return !isNaN(Number(item)) && Number(item) != 0;
  });

  return allKeys.map((key) => {
    return { label: TimeInterval[+key], value: +key } as SelectOption;
  });
};

onClickOutside(target,() => data.value = false)

onKeyStroke("Enter", async (e) => {
  if (props.modelValue) await handleUpdateCharge();
});

onKeyStroke("Escape", async (e) => {
  data.value = false;
});

const handleClose = () => {
  data.value = false;
};

watchDeep(fixedCostUDto, (newVal) => {
  isDirty.value = isDirtyCalc(newVal as ChargeDto);
});

const isDirtyCalc = (newCharge: ChargeDto): boolean => {
  let isDirty = false;
  const compareProperties = ["name", "value", "timeInterval"];
  compareProperties.forEach((prop) => {
    if (newCharge[prop] != props.fixedcost[prop]) {
      isDirty = true;
    }
  });
  return isDirty;
};

watchDeep(fixedCostUDto, (newVal) => {
  monthlyCost.value = calculateMontlyChargeCost(newVal)
})

onBeforeUnmount(()=>{
  data.value = false;
})
</script>

<style>
.el-dialog__body {
  @apply px-4 py-2;
}
.el_overlay{
  z-index: 10000 !important;
  @apply !absolute;
}
</style>
