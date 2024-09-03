<template>
  <div v-if="createModus" class="flex-col">
    <div
      class="my-1 py-1 bg-foreground rounded-lg flex w-full content-center justify-between"
      ref="target"
    >
      <InputText
        v-model="chargeCDto.name"
        size="small"
        class="input text-sm outline-none bg-transparent pl-2 font-semibold text-primary w-[45%] relative"
        placeholder="Name"
      />
      <InputText
        v-model="chargeCDto.value"
        size="small"
        class="input text-sm outline-none bg-transparent pl-2 font-semibold text-primary w-[45%] relative"
        type="number"
        placeholder="Wert"
      />

      <div class="flex-1 ml-2 flex-center">
        <div
          :class="
            allowedToSafe
              ? 'bg-primary text-highlight-text border-border hover:shadow-secondary hover:bg-primary-light hover:cursor-pointer duration-300 shadow-lg'
              : 'bg-copy-light border-slate-300 cursor-not-allowed'
          "
          class="rounded-full border-2 flex-center w-8 h-8"
          @click="handleCreateCharge()"
        >
          <Icon
            name="material-symbols:save-outline"
            class="text-highlight-text p-1"
            size="1.8rem"
          />
        </div>
      </div>
    </div>
    <p class="text-red-600">{{ error }}</p>
  </div>
  <div
    v-else
    @click="() => (createModus = true)"
    id="addButton"
    class="flex-center w-full cursor-pointer opacity-30 hover:opacity-100 duration-300 my-4"
  >
    <Icon name="gridicons:add-outline" size="1.5rem" class="" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import {
  ChargeCDto,
  CreateChargeRequest,
  UpdateBudgetChargeRequest,
} from "~/stores/apiClient";
import { useApiStore } from "~/stores/apiStore";
import { useInspectionStore } from "~/stores/costInspectionStore";

const costInspectionStore = useInspectionStore();
const { selectedMontlyBudget } = storeToRefs(costInspectionStore);

const createModus = ref(false);
const emit = defineEmits(["leave"]);
const chargeCDto = reactive<ChargeCDto>({});
const target = ref(null);
const allowedToSafe = ref(false);
const error = ref("");

const validateValueInput = (): boolean => {
  const regexPattern = /^\d+(\.\d{1,2})?$/;
  return true;
};

const handleCreateCharge = async () => {
  if (allowedToSafe.value) {
    chargeCDto.monthlyBudgetId = selectedMontlyBudget.value.id;
    await useApiStore().ChargeClient.createChargeEndpoint({
      chargeCDto,
    } as CreateChargeRequest);
    await useInspectionStore().fetch();
  }
  chargeCDto.value = undefined;
  chargeCDto.name = undefined;
};

onClickOutside(target, async () => {
  createModus.value = false;
  chargeCDto.value = undefined;
  chargeCDto.name = undefined;
  emit("leave");
});

onKeyStroke("Enter", () => {
  handleCreateCharge();
});

watchDeep(chargeCDto, (newValue) => {
  if (newValue.value && newValue.name) {
    if (!validateValueInput(newValue.value)) {
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
