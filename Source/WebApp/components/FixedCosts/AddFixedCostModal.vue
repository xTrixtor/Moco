<template>
  <el-dialog
    v-if="props.modelValue"
    v-model="props.modelValue"
    :title="'Hinzufügen von Kosten'"
    width="30%"
    :before-close="handleClose"
  >
    <div class="w-full h-full bg-slate-50 py-4 px-1 rounded-lg">
      <div class="flex items-center">
        <p class="w-1/2">Name</p>
        <BaseCustomInput
          v-model="fixedCostCDto.name"
          type="text"
          placeholder="Name"
          :clearable="true"
        />
      </div>
      <div class="flex">
        <p class="w-1/2 flex items-center">Kosten</p>
        <BaseCustomInput
          v-model="fixedCostCDto.value"
          type="number"
          placeholder="Kosten"
          :clearable="true"
        />
      </div>
      <div class="flex">
        <p class="w-1/2 flex items-center">Time-Interval</p>
        <el-select v-model="fixedCostCDto.timeInterval" class="m-2 w-full">
          <el-option
            v-for="(item, key) in createTimeIntervalSelectOptions()"
            :key="key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="flex">
        <p class="w-1/2 flex items-center">Gruppierung</p>
        <el-select v-model="fixedCostCDto.groupCostId" class="m-2 w-full">
            <el-option
              v-for="(item, key) in groupCostOptions??[]"
              :key="key"
              :label="item.name"
              :value="item.id"
            />
            <template #footer>
              <div v-if="!isAdding" id="addButton" class="cursor-pointer hover:bg-brand/25 duration-300 rounded-md py-1" @click="() => isAdding= true">
                  <Icon name="gridicons:add-outline" class="w-full text-xl"/>
              </div>
                <div v-else class="flex-center bg-slate-50 border-b-2" :class="newGroupCostName?'border-brand':''">
                  <BaseCustomInput
                  v-model="newGroupCostName"
                  type="text"
                  placeholder="Neue Gruppierung"
                  class="flex-1"
                  :styling="'border-none'"
                  :clearable="true"
                  />
                  <Icon name="gridicons:add-outline" @click="onConfirm" class="ml-2 text-2xl cursor-pointer " :class="newGroupCostName?'duration-500 rotate-180 text-green-800':'text-zinc-300/75'" />
                  <Icon name="ic:round-clear" @click="clear" class="ml-2 text-2xl cursor-pointer duration-300 hover:rotate-90 hover:text-red-600"/>
                </div>
            </template>
          </el-select>
      </div>
      <div
        class="flex flex-row-reverse justify-between"
        v-if="calculatedMontlyChargeCost || calculatedMontlyChargeCost == 0"
      >
        <div
          class="w-10 h-10 flex items-center justify-center rounded-full mt-2 bg-indigo-700 border-2 border-violet-900 hover:-translate-y-1 duration-300 hover:shadow-indigo-400 shadow-lg hover:cursor-pointer hover:bg-indigo-600"
        >
          <Icon
            name="material-symbols:save-outline"
            class="text-white w-full h-full p-1"
            @click="handleCreateCharge()"
          />
        </div>
        <p
          v-if="calculatedMontlyChargeCost != 0"
          class="font-bold my-1 flex-center"
        >
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
import {
  CreateFixedCDto,
  GroupCostCDto,
  TimeInterval,
} from "~/stores/apiClient";
import { useApiStore } from "~/stores/apiStore";
import { storeToRefs } from "pinia";
import { useFixedCostStore } from "~/stores/fixedCostStore";

interface AddChargeModalProps {
  modelValue: boolean;
}
interface SelectOption {
  label: string;
  value: TimeInterval;
}

const apiStore = useApiStore();
const fixedCostStore = useFixedCostStore();
const {groupCostOptions} = storeToRefs(fixedCostStore)

const props = defineProps<AddChargeModalProps>();
const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emit);
let fixedCostCDto = reactive<CreateFixedCDto>({});
const newGroupCostName = ref<String>("");

const isAdding = ref(false)

const calculatedMontlyChargeCost = computed<number | undefined>(() =>
  calculateMontlyChargeCost(fixedCostCDto.timeInterval, fixedCostCDto.value)
);

const onConfirm = async () => {
  if (newGroupCostName) {
    await apiStore.GroupcostClient.createGroupCostEndpoint({name:newGroupCostName.value} as GroupCostCDto)
    await fixedCostStore.fetch();
    clear()
  }
}


const clear = () => {
  newGroupCostName.value = "";
  isAdding.value = false
}

const handleCreateCharge = async () => {
  await useApiStore().FixedcostClient.createFixedCostEndpoint(fixedCostCDto);
  fixedCostCDto = {} as CreateFixedCDto;
  await useFixedCostStore().fetch();
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

onKeyStroke("Enter", async (e) => {
    if(props.modelValue){
      await handleCreateCharge();
    }
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

#addButton:hover{
  svg{
      @apply duration-500 rotate-180;
  }
}
</style>
