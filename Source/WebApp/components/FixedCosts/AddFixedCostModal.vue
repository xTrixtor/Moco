<template>
  <el-dialog
    v-if="props.modelValue"
    v-model="props.modelValue"
    :title="'Hinzufügen von Kosten'"
    width="30%"
    :before-close="handleClose"
    class="!bg-foreground"
  >
    <div class="w-full h-full py-4 px-1 rounded-lg bg-foreground">
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
        <el-select v-model="fixedCostCDto.timeInterval" class="m-2 w-full !bg-forground">
          <el-option
            v-for="(item, key) in createTimeIntervalSelectOptions()"
            :key="key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="flex">
        <p class="w-1/2 flex items-center !text-white">Gruppierung</p>
        <el-select v-model="fixedCostCDto.groupCostId" class="m-2 w-full">
          <el-option
            v-for="(item, key) in groupCostOptions ?? []"
            :key="key"
            :label="item.name"
            :value="item.id"
          />
          <template #footer>
            <div
              v-if="!isAdding"
              id="addButton"
              class="cursor-pointer hover:bg-primary/25 duration-300 rounded-md py-1"
              @click="() => (isAdding = true)"
            >
              <Icon name="gridicons:add-outline" class="w-full text-xl" />
            </div>
            <div
              v-else
              class="flex-center bg-slate-50 border-b-2"
              :class="newGroupCostName ? 'border-primary' : ''"
            >
              <BaseCustomInput
                v-model="newGroupCostName"
                type="text"
                placeholder="Neue Gruppierung"
                class="flex-1"
                :styling="'border-none'"
                :clearable="true"
              />
              <Icon
                name="gridicons:add-outline"
                @click="onConfirm"
                class="ml-2 text-2xl cursor-pointer"
                :class="
                  newGroupCostName
                    ? 'duration-500 rotate-180 text-green-800'
                    : 'text-zinc-300/75'
                "
              />
              <Icon
                name="lets-icons:back"
                @click="clear"
                class="ml-2 text-2xl cursor-pointer duration-300"
              />
            </div>
          </template>
        </el-select>
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
  </el-dialog>
</template>

<script setup lang="ts">
import {
  CreateFixedCDto,
  GroupCostCDto,
  GroupCostDto,
  TimeInterval,
} from "~/stores/apiClient";
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

const groupCost = inject<GroupCostDto>("groupCost");

const apiStore = useApiStore();
const fixedCostStore = useFixedCostStore();
const { groupCostOptions } = storeToRefs(fixedCostStore);

const props = defineProps<AddChargeModalProps>();
const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emit);
let fixedCostCDto = reactive<CreateFixedCDto>({
  groupCostId: groupCost?.id,
} as CreateFixedCDto);
const newGroupCostName = ref<String>("");

const isAdding = ref(false);
const allowedToSafe = ref(false);

let calculatedMontlyChargeCost = computed<number>(() =>
  calculateMontlyChargeCost(fixedCostCDto)
);

const onConfirm = async () => {
  if (allowedToSafe.value) {
    await apiStore.GroupcostClient.createGroupCostEndpoint({
      name: newGroupCostName.value,
    } as GroupCostCDto);
    await fixedCostStore.fetch();
    clear();
  }
};

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

const handleClose = () => {
  data.value = false;
};

watchDeep(fixedCostCDto, (newValue) => {
  const { name, timeInterval, value, groupCostId } = newValue;

  if (name && timeInterval && value && groupCostId) {
    allowedToSafe.value = true;
  } else {
    allowedToSafe.value = false;
  }
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
