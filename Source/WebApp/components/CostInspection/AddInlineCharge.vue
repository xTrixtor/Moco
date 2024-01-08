<template>
  <div v-if="createModus" class="flex-col">
    <div
      class="flex my-1 !border-2 py-1 border-border bg-foreground divide-x-2 divide-border rounded-lg"
      ref="target"
    >
      <input
        v-model="chargeCDto.chargeName"
        class="input text-sm outline-none bg-transparent pl-2 font-semibold text-success w-[45%] relative"
        placeholder="Name"
      />
      <input
        v-model="chargeCDto.value"
        class="input text-sm outline-none bg-transparent pl-2 font-semibold text-success w-[45%] relative"
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
          size="2rem"
        />
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
import { ChargeCDto, CreateChargeRequest } from "~/stores/apiClient";
import { useApiStore } from "~/stores/apiStore";
import { useInspectionStore } from "~/stores/costInspectionStore";

const costInspectionStore = useInspectionStore();
const { selectedBudget, selectedCostInspection } =
  storeToRefs(costInspectionStore);

const createModus = ref(false);
const emit = defineEmits(["leave"]);
const chargeCDto = reactive<ChargeCDto>({});
const target = ref(null);
const allowedToSafe = ref(false);
const error = ref("");

const validateValueInput = (): boolean => {
  const regexPattern = /^\d+(\.\d{1,2})?$/;
  return regexPattern.test(chargeCDto.value);
};

const handleCreateCharge = async () => {
  if (allowedToSafe.value) {
    chargeCDto.budgetId = selectedBudget.value.id;
    chargeCDto.costInspectionId = selectedCostInspection.value.id;
    await useApiStore().ChargeClient.createChargeEndpoint({
      chargeCDto,
    } as CreateChargeRequest);
    await useInspectionStore().fetch();
  }
  chargeCDto.value = undefined;
  chargeCDto.chargeName = undefined;
};

onClickOutside(target, async () => {
  createModus.value = false;
  chargeCDto.value = undefined;
  chargeCDto.chargeName = undefined;
  emit("leave");
});

onKeyStroke("Enter", () =>{
  handleCreateCharge();
})

watchDeep(chargeCDto, (newValue) => {
  if (newValue.value && newValue.chargeName) {
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
