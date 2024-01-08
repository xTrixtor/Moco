<template>
  <div v-if="createModus" class="flex-col">
    <div
      class="flex border-b-2 py-1 border-border divide-x-2 divide-border rounded-lg mb-2"
      ref="target"
    >
      <input
        v-model="createBudgetDto.name"
        class="input text-sm outline-none bg-transparent pl-2 !text-success w-[45%] relative"
        placeholder="Name"
      />
      <input
        v-model="createBudgetDto.limit"
        class="input text-sm outline-none bg-transparent pl-2 font-semibold !text-success w-[45%] relative"
        type="number"
        placeholder="Wert"
      />

      <div
        :class="
          allowedToSafe
            ? 'bg-indigo-700 border-violet-900 hover:shadow-indigo-400 hover:bg-indigo-600 hover:cursor-pointer hover:scale-110 hover:-translate-y-1 duration-300 shadow-lg'
            : 'bg-gray-300 border-slate-300 cursor-not-allowed'
        "
        class="flex-center rounded-full border-2 mr-1"
      >
        <Icon
          name="material-symbols:save-outline"
          class="text-white p-1"
          @click="handleCreateCharge()"
          size="1.7rem"
        />
      </div>
    </div>
    <p class="text-red-600">{{ error }}</p>
  </div>
  <div
    v-else
    @click="() => (createModus = true)"
    id="addButton"
    class="flex-center w-full cursor-pointer opacity-60 hover:opacity-100 duration-300 my-2"
  >
    <Icon name="gridicons:add-outline" color="white" class="text-xl" />
  </div>
</template>

<script setup lang="ts">
import {
  CBudgetRequest,
} from "~/stores/apiClient";
import { useApiStore } from "~/stores/apiStore";
import { useBudgetStore } from "~/stores/budgetStore";
import { useOverviewCostStore } from "~/stores/overviewCostStore";

interface BudgetCDto {
  name?: string;
  limit?: number;
}

const createModus = ref(false);
const emit = defineEmits(["leave"]);
let createBudgetDto = reactive<BudgetCDto>({});

const target = ref(null);
const allowedToSafe = ref(false);
const error = ref("");

const validateValueInput = (): boolean => {
  const regexPattern = /^\d+(\.\d{1,2})?$/;
  return regexPattern.test(createBudgetDto.limit);
};

const handleCreateCharge = async () => {
  if (allowedToSafe.value) {
    await useApiStore().BudgetClient.createBudgetEndpoint({
      budget: createBudgetDto,
    } as CBudgetRequest);
    await useBudgetStore().fetch();
    await useOverviewCostStore().calulateCostOverview();
  }
  createBudgetDto.name = undefined;
  createBudgetDto.limit = undefined;
};

onKeyStroke("Enter", async () => {
    await handleCreateCharge();
})

onClickOutside(target, async () => {
  createModus.value = false;
  createBudgetDto.name = undefined;
  createBudgetDto.limit = undefined;
  emit("leave");
});

watchDeep(createBudgetDto, (newValue) => {
  if (newValue.name && newValue.limit) {
    if (!validateValueInput(newValue.limit)) {
      error.value = "Bitte nur zwei stellen nach dem Komma!";
      allowedToSafe.value = false;
      return;
    } else {
      error.value = "";
    }
    allowedToSafe.value = true;
  } else {
    allowedToSafe.value = false;
  }
});
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
