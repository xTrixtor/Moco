<template>
  <div
    class="h-full bg-foreground border-2 border-border overflow-auto rounded-lg"
  >
    <div class="w-full p-2 flex justify-end">
      <Icon
        v-if="showNotPaid"
        name="iconoir:eye-solid"
        size="2rem"
        color="white"
        class="hover:text-primary hover:cursor-pointer"
        @click="() => (showNotPaid = false)"
      />
      <Icon
        v-else
        name="mingcute:eye-close-line"
        size="2rem"
        color="white"
        class="hover:text-primary hover:cursor-pointer"
        @click="() => (showNotPaid = true)"
      />
    </div>
    <DataTable
      lazy
      paginator
      :rows="10"
      :loading="loading"
      :rowClass="rowClass"
      :value="lazyLoadDepositRates"
      @page="loadData($event)"
      :pt="{
        paginator: { root: 'p-0', paginatorWrapper: 'border-0 flex-1' },
        bodyRow: { class: ' h-5' },
      }"
      :total-records="totalRates"
    >
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :pt="{ bodyCell: { class: 'p-3.5' } }"
      />
      <Column
        field="key"
        header="Gespartes Geld"
        :pt="{ bodyCell: { class: 'p-3.5' } }"
      >
        <template #body="slotProps">
          <p>{{ slotProps.data.value }} €</p>
        </template>
      </Column>
      <Column header="Aktions" :pt="{ bodyCell: { class: 'p-2' } }">
        <template #body="slotProps">
          <div v-if="slotProps.data.isPaid">
            <p class="font-bold text-lg">Bezahlt</p>
          </div>
          <div
            v-else
            class="w-full flex flex-1 justify-start gap-6 items-center"
          >
            <Icon
              name="material-symbols:check"
              class="opacity-30 hover:scale-150 hover:!opacity-100 duration-300 cursor-pointer hover:text-primary text-green-500"
              size="1.5rem"
              @click="() => handlePaid(slotProps.data.id)"
            />
            <div class="relative" @click="toggle">
              <Icon
                name="akar-icons:cross"
                class="opacity-30 hover:scale-150 hover:!opacity-100 duration-300 cursor-pointer text-red-500"
                size="1rem"
                @click="() => handleNoPaySelect(slotProps.data)"
              />
              <OverlayPanel ref="op" :show-close-icon="true">
                <div class="flex flex-col p-2">
                  <div
                    class="text-highlight-text underline-offset-4"
                  >
                    <p>Wie viel Geld können Sie in diesem Monat einzahlen? </p>
                    <desc class="flex underline decoration-primary font-bold">Eigentliche Einzahlungsrate: <p class="pl-2 font-bold">{{ selectedSavingGoal.depositRate }} €</p></desc>
                  </div>
                  <div class="flex gap-4 mt-4">
                    <InputNumber
                      size="small"
                      v-model="newDepositRate"
                      placeholder="Einzahlungswert"
                      :pt="{ root: { class: 'flex-1' } }"
                    />
                    <Button
                      outlined
                      size="small"
                      class="hover:bg-primary duration-700"
                    >
                      <Icon
                        name="material-symbols:save-outline"
                        class="text-highlight-text p-1"
                        size="1.8rem"
                        @click="() => handleSave()"
                      />
                    </Button>
                  </div>
                </div>
              </OverlayPanel>
            </div>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import OverlayPanel from "primevue/overlaypanel";
import { DepositRateDto, SavingGoalDto } from "~/stores/apiClient";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useApiStore } from "~/stores/apiStore";
import { storeToRefs } from "pinia";
import { useSavingGoalStore } from "~/stores/savingGoalStore";
import { calculateDepositsWithMonthlyRate } from "~/metaData/savingGoalService";
import { addMonths, startOfDay } from "date-fns";

export interface DepositHistoryProps {
  savingGoal: SavingGoalDto;
}
const props = defineProps<DepositHistoryProps>();
const { selectedSavingGoal } = storeToRefs(useSavingGoalStore());
const selectedNoPayDepositRate = ref<DepositRateDto>();
const loading = ref(false);
const lazyLoadDepositRates = ref<DepositRateDto[]>(
  props.savingGoal.depositRates ?? []
);
const totalRates = ref(props.savingGoal.totalRates ?? 0)
const lazyParams = ref(undefined);
const newDepositRate = ref<number>(undefined);
const op = ref();
const showNotPaid = ref(false);

const columns = [{ field: "key", header: "Month-Year" }];

const toggle = (event: any) => {
  op.value.toggle(event);
  newDepositRate.value = undefined;
};

const handlePaid = async (depositRateId: number) => {
  await useApiStore().SavingGoalsClient.payDepositRateEndpoint({
    id: depositRateId,
    savingGoalId: selectedSavingGoal.value.id,
  });

  await loadData(lazyParams.value ?? { first: 0 });
};

const rowClass = (data: DepositRateDto) => {
  return [{ "bg-green-500": data.isPaid }];
};

const handleNoPaySelect = (depositRate: DepositRateDto) =>{
  selectedNoPayDepositRate.value = depositRate
}

const handleSave = () => {
  updateRatesWithRates(selectedNoPayDepositRate.value);
};

const updateRatesWithRates = (lastRate: DepositRateDto) => {
  const { depositRate, goalValue } = selectedSavingGoal.value;
  const result = calculateDepositsWithMonthlyRate(
    depositRate,
    goalValue,
    lastRate.value + newDepositRate.value - depositRate,
    lastRate.savingMonth
  );
  console.log(result);
};

const firstDeposit: DepositRateDto = props.savingGoal.depositRates[0];

const loadData = async (event) => {
  loading.value = true;
  lazyParams.value = event;
  const firstDepositRateInNextPage = startOfDay(
    addMonths(firstDeposit.savingMonth, event.first)
  );

  const response =
    await useApiStore().SavingGoalsClient.lazyLoadDepositRateEndpoint(
      selectedSavingGoal.value.id,
      event.first,
      showNotPaid.value
    );
  lazyLoadDepositRates.value = response.depositRates ?? [];
  totalRates.value = response.totalRates;
  loading.value = false;
};
watch(showNotPaid, (newVal) =>{
  loadData(lazyParams.value??{first:0});
})
</script>

<style scoped></style>
