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
          :min="0"
          :maxFractionDigits="2"
        />
      </div>
      <div :class="modalRowStyling">
        <p class="w-1/4">Start-Kapital</p>
        <InputNumber
          class="flex-1"
          v-model="savingGoalCDto.initialCapital"
          :min="0"
          :maxFractionDigits="2"
        />
      </div>
      <div :class="modalRowStyling">
        <p class="w-1/4">Spar-Methode</p>
        <Dropdown
          class="flex-1"
          v-model="selectedSavingOption"
          :options="savingOptions"
          placeholder="Bitte auswählen"
          optionLabel="label"
        />
      </div>
      <div :class="modalRowStyling">
        <p class="w-1/4">Monatliche Rate</p>
        <InputNumber
          class="flex-1"
          v-model="savingGoalCDto.depositRate"
          :min="0"
          :maxFractionDigits="2"
          @update:model-value="calculateDates"
          :disabled="selectedSavingOption.key != 0"
          :placeholder="
            selectedSavingOption.key != 0
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
          :disabled="selectedSavingOption.key != 1"
          :placeholder="
            selectedSavingOption.key != 1
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
          :disabled="selectedSavingOption.key != 1"
          :placeholder="
            selectedSavingOption.key != 1
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
import { calculateDepositsWithMonthlyRate } from "~/metaData/savingGoalService";

const modalRowStyling = "flex-center justify-between gap-6 my-3";

const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emit);
let savingGoalCDto: Ref<SavingGoalCDto> = ref<SavingGoalCDto>({});
const canSave = computed(() =>
  Boolean(
    savingGoalCDto.value.name &&
      savingGoalCDto.value.goalValue &&
      savingGoalCDto.value.depositRate
  )
);

const canSaveBool = Boolean(savingGoalCDto.value.name);

const selectedSavingOption: Ref<{ key: number; label: string }> = ref({});

const savingOptions: { key: number; label: string }[] = [
  { key: 0, label: "Monatliche Raten" },
  { key: 1, label: "Start und End Datum" },
];

const handleCreate = async () => {
  const result = await useApiStore().SavingGoalsClient.createSavingGoalEndpoint(
    savingGoalCDto.value
  );
  await useSavingGoalStore().fetch();
  savingGoalCDto.value = {};
  selectedSavingOption.value = {};
  data.value = false;
};

watch(savingGoalCDto.value, (newVal: SavingGoalCDto) => {
  if (savingGoalCDto.value.depositRate && savingGoalCDto.value.goalValue) {
    calculateDates(newVal);
  }
});

const calculateDates = (newVal?: SavingGoalCDto) => {
  if (savingGoalCDto.value !== newVal) {
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
