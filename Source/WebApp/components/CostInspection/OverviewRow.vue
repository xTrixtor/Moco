<template>
  <div
    class="bg-foreground border-border border-2 rounded-md p-2 flex gap-3 text-highlight-text lg:divide-x-2 flex-center text-xs lg:text-base flex-col lg:flex-row"
  >
    <div class="flex-center gap-2 relative">
      <p class="flex">
        Monatliches Guthaben: {{ useRound(monthyRevenue, 2) }} €
      </p>
      <Icon
        name="material-symbols:info-outline"
        size="1.5rem"
        class="hover:text-primary hover:cursor-pointer"
        :class="creditDetailsVis ? 'text-primary' : ''"
        @click="() => (creditDetailsVis = true)"
      />
      <Transition>
        <div
          v-if="creditDetailsVis"
          ref="target"
          class="absolute w-[400px] max-h-72 overflow-auto -right-1/2 top-10 bg-secondary-content z-[999] border-primary border-2 rounded-md p-6"
        >
          <div class="flex flex-1 justify-end">
            <Icon
              name="material-symbols:cancel-outline"
              class="cursor-pointer hover:text-primary duration-200"
              size="1.2rem"
              @click="() => (creditDetailsVis = false)"
            />
          </div>
          
          <div class="p-2 divide-y-2">
            <div
              v-if="selectedCostInspection.credits?.length > 0"
              v-for="credit in toRaw(selectedCostInspection.credits)"
              class="flex justify-between px-2 items-center gap-5 py-1"
            >
              <div class="w-[45%]">
                <BaseEditInput
                  v-model="credit.name"
                  @leave="() => handleCreditUpdate(credit)"
                />
              </div>
              <div class="w-[45%]">
                <BaseEditInput
                  v-model="credit.value"
                  type="number"
                  @leave="() => handleCreditUpdate(credit)"
                />
              </div>
              <div class="w-[10%]">
                <Icon
                  name="material-symbols:delete-outline"
                  size="1.2rem"
                  class="opacity-50 hover:opacity-100 text-red-600"
                  @click="handleDelete(credit)"
                />
              </div>
            </div>
            <div v-else class="flex-center pb-2">Keine Daten</div>
            <CostInspectionAddInlineCredit class="pt-2" />
          </div>
            <div class="flex flex-1 justify-end">
            <Button outlined size="small" @click="() => (creditDetailsVis = false)">OK</Button>
          </div>
        </div>
      </Transition>
    </div>
    <p class="flex pl-2">
      Aktuelles Geld: {{ useRound(currentMoney, 2) }} € 
    </p>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import {
  ChargeDto,
  CreditDto,
  MonthlyBudgetDto,
  UpdateCreditRequest,
} from "~/stores/apiClient";
import { useApiStore } from "~/stores/apiStore";
import { useInspectionStore } from "~/stores/costInspectionStore";
import { useConfirm } from "primevue/useconfirm";

const { selectedCostInspection } = storeToRefs(useInspectionStore());
const creditDetailsVis = ref(false);
const target = ref(null);
const confirm = useConfirm();

const monthyRevenue = computed(() =>
  useSumBy(selectedCostInspection.value.credits, function (r) {
    return r.value;
  })
);

onClickOutside(target, async () => {
  creditDetailsVis.value = false;
  console.log(target)
});

const calculateCharges = (): number => {
  let sum = 0 as number;

  if (selectedCostInspection.value.monthlyBudgets == undefined) {
    return sum;
  }

  selectedCostInspection.value.monthlyBudgets.forEach(
    (monthlyBudget: MonthlyBudgetDto) => {
      const budgetSum = useSumBy(
        monthlyBudget.charges,
        function (charge: ChargeDto) {
          if (typeof charge.value == "string")
            return parseInt(charge.value) ?? 0;

          return charge.value;
        }
      );
      if (budgetSum != 0 || budgetSum != "0") {
        sum += budgetSum as number;
      }
    }
  );

  return sum;
};

const calculateFixedCostSum = (): number => {
  return useSumBy(
    selectedCostInspection.value.fixedCostChecklist?.filter((x) => x.isChecked),
    function (f) {
      return f.value;
    }
  );
};
const fixedCostSum = computed(() => calculateFixedCostSum());
const chargesSum = computed(() => calculateCharges());

const currentMoney = computed(
  () => monthyRevenue.value - (fixedCostSum.value + chargesSum.value)
);

const handleCreditUpdate = async (credit: CreditDto) => {
  const request: UpdateCreditRequest = {
    creditUDto: { id: credit.id, name: credit.name, value: credit.value },
  };
  await useApiStore().CreditClient.updateCreditEndpoint(request);
  await useInspectionStore().fetch();
};

const handleDelete = async (credit: CreditDto) => {
  confirm.require({
    message: "Willst du dieses Guthaben löschen?",
    icon: "pi pi-info-circle",
    rejectClass: "p-button-secondary p-button-outlined p-button-sm",
    acceptClass: "p-button-danger p-button-sm",
    rejectLabel: "Abbruch",
    acceptLabel: "Löschen",
    accept: async () => {
      await useApiStore().CreditClient.deleteCreditEndpoint(credit.id);
      await useInspectionStore().fetch();
    },
    reject: () => {},
  });
};
</script>

<style scoped>
.v-enter-active {
  animation: bounce-in 0.5s;
}
.v-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0);
    transform: translateY(200px);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    transform: translateY(0);
  }
}
</style>
