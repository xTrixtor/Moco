<template>
  <div
    class="p-4 border-2 border-border absolute -translate-x-[380px] z-20 bg-background"
    v-if="data"
  >
    <div class="flex flex-col p-2" ref="target">
      <div
        class="underline decoration-2 decoration-primary text-highlight-text underline-offset-4"
      >
        Wie viel Geld können Sie in diesem Monat einzahlen?
      </div>
      <div class="flex gap-4 mt-4">
        <InputNumber
          size="small"
          v-model="newDepositRate"
          placeholder="Einzahlungswert"
          :max="selectedSavingGoal.goalValue"
          :pt="{ root: { class: 'flex-1' } }"
        />
        <Button
          outlined
          size="small"
          class="hover:bg-primary duration-700"
          disabled
          @click="handleSave"
        >
          <Icon
            name="material-symbols:save-outline"
            class="text-highlight-text p-1"
            size="1.8rem"
            @click.prevent
          />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { calculateDepositsWithMonthlyRate } from "~/metaData/savingGoalService";
import { DepositRateDto } from "~/stores/apiClient";
import { useSavingGoalStore } from "~/stores/savingGoalStore";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emit);

const target = ref(null);
onClickOutside(target, async () => {
  data.value = false;
});

const { selectedSavingGoal } = storeToRefs(useSavingGoalStore());
const newDepositRate = ref<number>(undefined);
const handleSave = () => {
  const { depositRates } = selectedSavingGoal.value;
  const paidRates = useFilter(depositRates, function (rate: DepositRateDto) {
    return rate.isPaid;
  });
  const last = useLast<DepositRateDto>(paidRates);
  updateRatesWithRates(last);
  data.value = false;
};

const updateRatesWithRates = (lastRate: DepositRateDto) => {
  const { depositRate, goalValue } = selectedSavingGoal.value;
  const result = calculateDepositsWithMonthlyRate(
    depositRate,
    goalValue,
    lastRate.value + newDepositRate.value,
    lastRate.savingMonth,
  );
};
</script>

<style scoped></style>
