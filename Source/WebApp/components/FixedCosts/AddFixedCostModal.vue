<template>
  <Dialog
    v-if="data"
    modal
    class="w-1/3"
    v-model:visible="data"
    header="Hinzufügen von Kosten"
  >
    <div class="w-full h-full py-4 px-1">
      <div class="flex items-center">
        <p class="w-1/2 !text-white">Name</p>
        <BaseCustomInput
          v-model="fixedCostCDto.name"
          type="text"
          placeholder="Name"
          :clearable="true"
        />
      </div>
      <div class="flex">
        <p class="w-1/2 flex items-center !text-white">Kosten</p>
        <BaseCustomInput
          v-model="fixedCostCDto.value"
          type="number"
          placeholder="Kosten"
          :clearable="true"
        />
      </div>
      <div class="flex">
        <p class="w-1/2 flex items-center !text-white">Time-Interval</p>
        <Dropdown
          v-model="fixedCostCDto.timeInterval"
          placeholder="Auswählen"
          :options="createTimeIntervalSelectOptions()"
          option-label="label"
          option-value="value"
          :pt="{ input: { class: 'p-2' } }"
          class="w-full m-2"
        />
      </div>
      <div class="flex">
        <p class="w-1/2 flex items-center !text-white">Gruppierung</p>
        <Dropdown
          v-model="fixedCostCDto.groupCostId"
          placeholder="Auswählen"
          :options="groupCostOptions"
          option-label="name"
          option-value="id"
          :pt="{ input: { class: 'p-2' } }"
          class="w-full m-2"
        />
      </div>
      <div
        class="flex flex-row-reverse justify-between"
        v-if="calculatedMontlyChargeCost || calculatedMontlyChargeCost == 0"
      >
        <div
          :class="
            allowedToSafe
              ? 'bg-secondary border-border hover:shadow-secondary hover:bg-secondary-light hover:cursor-pointer hover:scale-110 hover:-translate-y-1 duration-300 shadow-lg'
              : 'bg-gray-300 border-slate-300 cursor-not-allowed'
          "
          class="w-10 h-10 flex items-center justify-center rounded-full mt-2"
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
  </Dialog>
</template>

<script setup lang="ts">
import { CreateFixedCDto, TimeInterval } from "~/stores/apiClient";
import { useApiStore } from "~/stores/apiStore";
import { storeToRefs } from "pinia";
import { useFixedCostStore } from "~/stores/fixedCostStore";
import { useOverviewCostStore } from "~/stores/overviewCostStore";

interface AddChargeModalProps {
  modelValue: boolean;
}
interface SelectOption {
  label: string;
  value: TimeInterval;
}

let activeIndex: Ref<number> = inject("activeIndex") ?? 0;

const fixedCostStore = useFixedCostStore();
const { groupCostOptions } = storeToRefs(fixedCostStore);

const props = defineProps<AddChargeModalProps>();
const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emit);
let fixedCostCDto = reactive<CreateFixedCDto>({} as CreateFixedCDto);
const newGroupCostName = ref<String>("");

const isAdding = ref(false);
const allowedToSafe = ref(false);

watch(activeIndex, (newVal, oldVal) => {
  fixedCostCDto.groupCostId = groupCostOptions.value[newVal]?.id ?? 0;
});

let calculatedMontlyChargeCost = computed<number>(() =>
  calculateMontlyChargeCost(fixedCostCDto),
);

const clear = () => {
  newGroupCostName.value = "";
  isAdding.value = false;
};

const handleCreateCharge = async () => {
  if (allowedToSafe.value) {
    await useApiStore().FixedcostClient.createFixedCostEndpoint(fixedCostCDto);
    fixedCostCDto = {} as CreateFixedCDto;
    await useFixedCostStore().fetch();
    data.value = false;
  }
  await useOverviewCostStore().calulateCostOverview();
  clear();
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
  if (props.modelValue) {
    await handleCreateCharge();
  }
});

onKeyStroke("Escape", async (e) => {
  data.value = false;
});

watchDeep(fixedCostCDto, (newValue) => {
  const { name, timeInterval, value, groupCostId } = newValue;

  if (name && timeInterval && value && groupCostId) {
    allowedToSafe.value = true;
  } else {
    allowedToSafe.value = false;
  }
});

onMounted(() => {
  fixedCostCDto.groupCostId = groupCostOptions.value[activeIndex.value].id;
});
</script>

<style>
.el-dialog__body {
  @apply px-4 py-2;
}

#addButton:hover {
  svg {
    @apply duration-500 rotate-180;
  }
}
</style>
