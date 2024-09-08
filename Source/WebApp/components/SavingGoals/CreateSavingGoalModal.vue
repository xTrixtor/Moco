<template>
  <Dialog
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    v-model:visible="data"
    modal
    header="Neues Sparziel erstellen"
    :style="{ width: '50%' }"
  >
    <div v-if="isMobil">
      <div class="flex flex-col gap-2">
        <label class="text-xs">Name</label>
        <InputText
          v-model="savingGoalCDto.name"
          size="small"
          :pt="{ root: { class: 'p-1 w-full' } }"
        />
        <label class="text-xs">Ziel Wert</label>
        <InputNumber
          v-model="savingGoalCDto.goalValue"
          size="small"
          :pt="{ root: { class: 'numberInput' } }"
          @update:model-value="calculateGoal"
          :min="0"
          :maxFractionDigits="2"
          mode="currency"
          currency="EUR"
          locale="de-DE"
        />
        <label class="text-xs">Start-Kapital</label>
        <InputNumber
          v-model="savingGoalCDto.initialCapital"
          size="small"
          :pt="{ root: { class: 'numberInput' } }"
          :max="savingGoalCDto.goalValue"
          @update:model-value="calculateGoal"
          :min="0"
          :maxFractionDigits="2"
          mode="currency"
          currency="EUR"
          locale="de-DE"
        />
        <label class="text-xs">Spar-Methode</label>
        <Dropdown
          class="flex-1"
          :pt="{ input: { class: 'p-1 text-sm' } }"
          v-model="savingGoalCDto.methodKey"
          @update:model-value="calculateGoal"
          :options="savingOptions"
          placeholder="Bitte auswählen"
          optionLabel="label"
          option-value="key"
        />
        <label class="text-xs">Monatliche Rate</label>
        <InputNumber
          v-model="savingGoalCDto.depositRate"
          size="small"
          :pt="{ root: { class: 'numberInput' } }"
          :min="0"
          :maxFractionDigits="2"
          @update:model-value="calculateGoal"
          :disabled="savingGoalCDto.methodKey != 0"
          :max="savingGoalCDto.goalValue - 1"
          mode="currency"
          currency="EUR"
          locale="de-DE"
          :placeholder="
            savingGoalCDto.methodKey != 0
              ? 'Wird berechnet...'
              : 'Bitte Monatliche Rate angeben...'
          "
        />
        <label class="text-xs">Start-Datum</label>
        <Calendar
          :pt="{ input: { class: 'p-1 text-sm' } }"
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
        <label class="text-xs">End-Datum</label>
        <Calendar
          :pt="{ input: { class: 'p-1 text-sm' } }"
          view="month"
          dateFormat="M-yy"
          class="flex-1"
          v-model="savingGoalCDto.endDate"
          :max-date="addYears(savingGoalCDto.startDate, 20)"
          :min-date="addMonths(savingGoalCDto.startDate, 1)"
          @update:model-value="calculateGoal"
          :disabled="savingGoalCDto.methodKey != 1"
          :placeholder="
            savingGoalCDto.methodKey != 1
              ? 'Wird berechnet...'
              : 'Bitte End-Datum auswählen...'
          "
        />
        <div class="flex justify-end gap-2">
          <Button
            :pt="{ root: { class: 'p-2' } }"
            outlined
            type="button"
            label="Abbrechen"
            severity="secondary"
            @click="data = false"
            size="small"
          ></Button>
          <Button
            :pt="{ root: { class: 'p-2' } }"
            outlined
            type="button"
            label="Erstellen"
            @click="handleCreate"
            :disabled="!canSave"
            size="small"
          ></Button>
        </div>
      </div>
    </div>
    <div v-else>
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
          mode="currency"
          currency="EUR"
          locale="de-DE"
        />
      </div>
      <div :class="modalRowStyling">
        <p class="w-1/4">Start-Kapital</p>
        <InputNumber
          class="flex-1"
          :max="savingGoalCDto.goalValue"
          v-model="savingGoalCDto.initialCapital"
          @update:model-value="calculateGoal"
          :min="0"
          :maxFractionDigits="2"
          mode="currency"
          currency="EUR"
          locale="de-DE"
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
          :max="savingGoalCDto.goalValue - 1"
          mode="currency"
          currency="EUR"
          locale="de-DE"
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
          :max-date="addYears(savingGoalCDto.startDate, 20)"
          :min-date="addMonths(savingGoalCDto.startDate, 1)"
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
import { addMonths, addYears } from "date-fns";
import { useToast } from "primevue/usetoast";
import { useUtilStore } from "~/stores/utilStore";

const { isMobil } = storeToRefs(useUtilStore());
const toast = useToast();

const modalRowStyling = "flex-center justify-between gap-6 my-3";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(["update:modelValue"]);

const { selectedSavingGoal, savingGoals } = storeToRefs(useSavingGoalStore());
const data = useVModel(props, "modelValue", emit);
let savingGoalCDto: Ref<SavingGoalCDto> = ref<SavingGoalCDto>({
  initialCapital: 0,
});
const minDate = ref(addMonths(new Date(), 1));
const canSave = computed(() =>
  Boolean(
    savingGoalCDto.value.name &&
      savingGoalCDto.value.goalValue &&
      savingGoalCDto.value.depositRate &&
      isValid.value
  )
);
const isValid = ref(false);

const handleCreate = async () => {
  const newSavingGoal =
    await useApiStore().SavingGoalsClient.createSavingGoalEndpoint(
      savingGoalCDto.value
    );
  selectedSavingGoal.value = newSavingGoal;
  savingGoals.value = [...savingGoals.value, newSavingGoal];
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
const calculateGoalWithDate = () => {
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
    isValid.value = true;
  }
};

const calculateGoalWithRates = () => {
  if (savingGoalCDto.value.depositRate && savingGoalCDto.value.goalValue) {
    const result = calculateDepositsWithMonthlyRate(
      savingGoalCDto.value.depositRate,
      savingGoalCDto.value.goalValue,
      savingGoalCDto.value.initialCapital ?? 0
    );
    if (result == undefined) {
      toast.add({
        severity: "warn",
        summary: "Plan dauert zu lange",
        detail:
          "Bitte erstelle keine Sparziele, welche länger als 20 Jahre gehen",
        life: 3000,
      });
      return;
    }
    savingGoalCDto.value.startDate = result[0].savingMonth;
    const lastDepositRateValue = useLast(result);
    savingGoalCDto.value.endDate = lastDepositRateValue.savingMonth;
    savingGoalCDto.value.depositRates = result;
    isValid.value = true;
  }
};
</script>

<style>
.numberInput .p-inputtext {
  padding: 0.25rem !important;
  font-size: 0.875rem !important;
}
</style>
