<template>
  <Dialog
    v-model:visible="data"
    modal
    header="Neues Sparziel erstellen"
    :style="{ width: '50%' }"
  >
    <div>
      <div :class="modalRowStyling">
        <p class="w-1/4">Name</p>
        <InputText class="flex-1" type="text" v-model="savingGoalCDto.name" />
      </div>
      <div :class="modalRowStyling">
        <p class="w-1/4">Ziel Wert</p>
        <InputNumber
          class="flex-1"
          v-model="savingGoalCDto.goalValue"
          @update:model-value="calculateGoal"
          :min="0"
          :maxFractionDigits="2"
        />
      </div>
      <div :class="modalRowStyling">
        <p class="w-1/4">Start-Kapital</p>
        <InputNumber
          class="flex-1"
          v-model="savingGoalCDto.initialCapital"
          @update:model-value="calculateGoal"
          :min="0"
          :maxFractionDigits="2"
        />
      </div>
      <div :class="modalRowStyling">
        <p class="w-1/4">Spar-Methode</p>
        <Dropdown
          class="flex-1"
          v-model="savingGoalCDto.methodKey"
          @update:model-value="calculateGoal"
          :options="savingOptions"
          placeholder="Bitte auswählen"
          optionLabel="label"
          option-value="key"
        />
      </div>
      <div :class="modalRowStyling">
        <p class="w-1/4">Monatliche Rate</p>
        <InputNumber
          class="flex-1"
          v-model="savingGoalCDto.depositRate"
          :min="0"
          :maxFractionDigits="2"
          @update:model-value="calculateGoal"
          :disabled="savingGoalCDto.methodKey != 0"
          :placeholder="
            savingGoalCDto.methodKey != 0
              ? 'Wird berechnet...'
              : 'Bitte Monatliche Rate angeben...'
          "
        />
      </div>
      <div :class="modalRowStyling">
        <p class="w-1/4">Start-Datum</p>
        <Calendar
          view="month"
          dateFormat="M-yy"
          class="flex-1"
          v-model="savingGoalCDto.startDate"
          @update:model-value="calculateGoal"
          :min-date="minDate"
          :disabled="savingGoalCDto.methodKey != 1"
          :placeholder="
            savingGoalCDto.methodKey != 1
              ? 'Wird berechnet...'
              : 'Bitte Start-Datum auswählen...'
          "
        />
      </div>
      <div :class="modalRowStyling">
        <p class="w-1/4">End-Datum</p>
        <Calendar
          view="month"
          dateFormat="M-yy"
          class="flex-1"
          v-model="savingGoalCDto.endDate"
          @update:model-value="calculateGoal"
          :disabled="savingGoalCDto.methodKey != 1"
          :placeholder="
            savingGoalCDto.methodKey != 1
              ? 'Wird berechnet...'
              : 'Bitte End-Datum auswählen...'
          "
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          outlined
          type="button"
          label="Abbrechen"
          severity="secondary"
          @click="data = false"
        ></Button>
        <Button
          outlined
          type="button"
          label="Erstellen"
          @click="handleCreate"
          :disabled="!canSave"
        ></Button>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import InputNumber from "primevue/inputnumber";
import { SavingGoalCDto } from "~/stores/apiClient";
import { useApiStore } from "~/stores/apiStore";
import { useSavingGoalStore } from "~/stores/savingGoalStore";
import {
  savingOptions,
  calculateDepositsWithDate,
  calculateDepositsWithMonthlyRate,
} from "~/metaData/savingGoalService";
import { storeToRefs } from "pinia";
import { addMonths } from "date-fns";

const modalRowStyling = "flex-center justify-between gap-6 my-3";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(["update:modelValue"]);

const { selectedSavingGoal, savingGoals } = storeToRefs(useSavingGoalStore());
const data = useVModel(props, "modelValue", emit);
let savingGoalCDto: Ref<SavingGoalCDto> = ref<SavingGoalCDto>({});
const minDate = ref(addMonths(new Date(), 1));
const canSave = computed(() =>
  Boolean(
    savingGoalCDto.value.name &&
      savingGoalCDto.value.goalValue &&
      savingGoalCDto.value.depositRate
  )
);

const handleCreate = async () => {
  const newSavingGoal =
    await useApiStore().SavingGoalsClient.createSavingGoalEndpoint(
      savingGoalCDto.value
    );
    selectedSavingGoal.value = newSavingGoal;
    savingGoals.value.push(newSavingGoal);
    useSavingGoalStore().setSelectedSavingGoal(newSavingGoal);
    data.value = false;
    savingGoalCDto.value = {};
};

watch(
  () => savingGoalCDto.value,
  (newVal, oldVal) => {
    if (newVal.methodKey != oldVal.methodKey) {
      savingGoalCDto.value.depositRate = undefined;
      savingGoalCDto.value.startDate = undefined;
      savingGoalCDto.value.endDate = undefined;
    }
  }
);

const calculateGoal = () => {
  if (savingGoalCDto.value.methodKey == 0) {
    calculateGoalWithRates();
  }
  if (savingGoalCDto.value.methodKey == 1) {
    calculateGoalWithDate();
  }
};
const calculateGoalWithDate = 
() => {
  if (
    savingGoalCDto.value.startDate &&
    savingGoalCDto.value.endDate &&
    savingGoalCDto.value.goalValue
  ) {
    const result = calculateDepositsWithDate(
      savingGoalCDto.value.startDate,
      savingGoalCDto.value.endDate,
      savingGoalCDto.value.goalValue,
      savingGoalCDto.value.initialCapital ?? 0
    );
    savingGoalCDto.value.depositRates = result.depositRates;
    savingGoalCDto.value.depositRate = result.monthRate;
  }
};

const calculateGoalWithRates = () => {
  if (savingGoalCDto.value.depositRate && savingGoalCDto.value.goalValue) {
    const result = calculateDepositsWithMonthlyRate(
      savingGoalCDto.value.depositRate,
      savingGoalCDto.value.goalValue,
      savingGoalCDto.value.initialCapital ?? 0
    );
    savingGoalCDto.value.startDate = result[0].savingMonth;
    const lastDepositRateValue = useLast(result);
    savingGoalCDto.value.endDate = lastDepositRateValue.savingMonth;
    savingGoalCDto.value.depositRates = result;
  }
};
</script>

<style scoped></style>
