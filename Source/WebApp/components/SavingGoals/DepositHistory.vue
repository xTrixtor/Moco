<template>
  <div
    class="h-full bg-foreground border-2 border-border rounded-lg overflow-hidden"
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
        root: { class: 'flex-1 h-[95%]' },
        wrapper: { class: 'h-[90%]' },
        table: { class: 'h-full' },
        tbody: { class: 'h-full' },
        paginator: { root: 'p-0', paginatorWrapper: 'border-0 flex-1' },
        bodyRow: { class: 'h-[10%]' },
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
          <p>{{ useCeil(slotProps.data.value, 1) }} €</p>
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
            <div
              v-if="slotProps.data.savingMonth < currentRate.savingMonth"
              class="w-full flex flex-1 justify-start gap-6 items-center"
            >
              <Icon
                name="material-symbols:check"
                class="opacity-30 hover:scale-150 hover:!opacity-100 duration-300 cursor-pointer hover:text-primary text-green-500"
                size="1.5rem"
                @click="() => handlePaid(slotProps.data.id)"
              />
              <div
                v-if="selectedSavingGoal?.methodKey != 1"
                class="relative"
                @click="toggle"
              >
                <Icon
                  name="akar-icons:cross"
                  class="opacity-30 hover:scale-150 hover:!opacity-100 duration-300 cursor-pointer text-red-500"
                  size="1rem"
                  @click="() => handleNoPaySelect(slotProps.data)"
                />
                <OverlayPanel ref="op" :show-close-icon="true">
                  <div class="flex flex-col p-2">
                    <div class="text-highlight-text flex flex-col gap-1">
                      <p
                        class="text-lg underline decoration-primary underline-offset-4"
                      >
                        Wie viel Geld können Sie in diesem Monat einzahlen?
                      </p>
                      <div
                        class="p-2 m-2 border-[1px] border-primary rounded-lg opacity-50 hover:opacity-100 duration-500 hover:cursor-pointer"
                      >
                        <desc class="flex font-bold"
                          >Eigentliche Monatsrate
                          <p class="pl-2 font-bold">
                            {{ selectedSavingGoal.depositRate }} €
                          </p>
                        </desc>
                        <desc class="flex font-bold"
                          >Schon gespartes Geld
                          <p class="pl-2 font-bold">
                            {{ selectedSavingGoal.currentSaving }} €
                          </p>
                        </desc>
                        <desc class="flex font-bold"
                          >Ziel:
                          <p class="pl-2 font-bold">
                            {{ selectedSavingGoal.goalValue }} €
                          </p>
                        </desc>
                      </div>
                    </div>
                    <div class="flex gap-4 mt-4">
                      <InputNumber
                        size="small"
                        v-model="newDepositRate"
                        placeholder="Einzahlungswert"
                        :max="
                          selectedSavingGoal.goalValue -
                          selectedNoPayDepositRate?.value
                        "
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
import {
  calculateDepositsWithDate,
  calculateDepositsWithMonthlyRate,
} from "~/metaData/savingGoalService";

const { selectedSavingGoal } = storeToRefs(useSavingGoalStore());
const selectedNoPayDepositRate = ref<DepositRateDto>();
const loading = ref(false);
const lazyLoadDepositRates = ref<DepositRateDto[]>(
  selectedSavingGoal.value.depositRates ?? [],
);
const totalRates = computed(() => selectedSavingGoal.value.totalRates ?? 0);
const lazyParams = ref(undefined);
const newDepositRate: Ref<number | undefined> = ref<number>(undefined);
const op = ref();
const showNotPaid = ref(false);

let currentRate = computed(
  () => lazyLoadDepositRates.value.filter((x) => x.isPaid == true)[0] ?? {},
);

const columns = [{ field: "key", header: "Month-Year" }];

const toggle = (event: any) => {
  op.value.toggle(event);
  newDepositRate.value = undefined;
};

const handlePaid = async (depositRateId: number) => {
  const updatedRate =
    await useApiStore().SavingGoalsClient.payDepositRateEndpoint({
      id: depositRateId,
      savingGoalId: selectedSavingGoal.value.id,
    });

  selectedSavingGoal.value.currentSaving =
    selectedSavingGoal.value.currentSaving +
    selectedSavingGoal.value.depositRate;
  await loadData(lazyParams.value ?? { first: 0 });
};

const rowClass = (data: DepositRateDto) => {
  return [
    { "!bg-green-500": data.isPaid },
    {
      "":
        data.savingMonth > currentRate.value.savingMonth ||
        JSON.stringify(currentRate.value) == "{}",
    },
  ];
};

const handleNoPaySelect = (depositRate: DepositRateDto) => {
  selectedNoPayDepositRate.value = depositRate;
};

const handleSave = async () => {
  const { methodKey } = selectedSavingGoal.value;
  if (methodKey == 0)
    await updateRatesWithRates(selectedNoPayDepositRate.value);
  if (methodKey == 1)
    await updateRatesWithDates(selectedNoPayDepositRate.value);
};

const updateRatesWithRates = async (currentRate: DepositRateDto) => {
  const { depositRate, goalValue, id, depositRates, initialCapital } =
    selectedSavingGoal.value;
  const index = depositRates?.findIndex((x) => x.key == currentRate.key);
  const rateBefore = depositRates[index - 1].value ?? initialCapital;

  const result = calculateDepositsWithMonthlyRate(
    depositRate,
    goalValue,
    rateBefore + newDepositRate.value,
    currentRate.savingMonth,
  );

  const response =
    await useApiStore().SavingGoalsClient.updateDepositRatesEndpoint({
      savingGoalId: id,
      updatedDepositRates: result,
    });

  selectedSavingGoal.value = response.savingGoal;
};

const updateRatesWithDates = async (currentRate: DepositRateDto) => {
  const { endDate, goalValue, currentSaving, id } = selectedSavingGoal.value;
  const result = calculateDepositsWithDate(
    currentRate.savingMonth,
    endDate,
    goalValue,
    currentSaving + newDepositRate.value,
  );
  const response =
    await useApiStore().SavingGoalsClient.updateDepositRatesEndpoint({
      savingGoalId: id,
      updatedDepositRates: result.depositRates,
      newDateRate: result.monthRate,
    });
  selectedSavingGoal.value = response.savingGoal;
};

const loadData = async (event) => {
  loading.value = true;
  lazyParams.value = event;

  const response =
    await useApiStore().SavingGoalsClient.lazyLoadDepositRateEndpoint(
      selectedSavingGoal.value.id,
      event.first,
      showNotPaid.value,
    );
  lazyLoadDepositRates.value = response.depositRates ?? [];
  totalRates.value = response.totalRates;
  currentRate.value = lazyLoadDepositRates.value.filter(
    (x) => x.isPaid == true,
  )[0];
  loading.value = false;
};
watch(showNotPaid, (newVal) => {
  loadData(lazyParams.value ?? { first: 0 });
});
watch(selectedSavingGoal, (newVal, OldVal) => {
  lazyLoadDepositRates.value = newVal.depositRates;
});
</script>

<style scoped></style>
