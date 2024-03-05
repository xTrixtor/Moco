<template>
    <div v-if="createModus" class="flex-col">
      <div
        class="my-1 py-1 bg-transparent rounded-lg flex w-full content-center justify-between gap-1"
        ref="target"
      >
        <InputText 
          v-model="creditCDto.name"
          size="small"
          class="input text-sm outline-none bg-transparent pl-2 font-semibold text-primary w-[45%] relative"
          placeholder="Name"
        />
        <InputText 
          v-model="creditCDto.value"
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
          @click="() => handleCreateCharge()"
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
      class="flex-center w-full cursor-pointer opacity-30 hover:opacity-100 duration-300"
    >
      <Icon name="gridicons:add-outline" size="1.2rem" class="" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { ChargeCDto, CreateChargeRequest, CreditCDto, CreditDto } from "~/stores/apiClient";
  import { useApiStore } from "~/stores/apiStore";
  import { useInspectionStore } from "~/stores/costInspectionStore";
  
  const costInspectionStore = useInspectionStore();
  const { selectedBudget, selectedCostInspection } =
    storeToRefs(costInspectionStore);
  
  const createModus = ref(false);
  const emit = defineEmits(["leave"]);
  const creditCDto = reactive<CreditCDto>({});
  const target = ref(null);
  const allowedToSafe = ref(false);
  const error = ref("");
  
  const validateValueInput = (): boolean => {
    const regexPattern = /^\d+(\.\d{1,2})?$/;
    return regexPattern.test(creditCDto.value);
  };
  
  const handleCreateCharge = async () => {
    if (allowedToSafe.value) {
      await useApiStore().CreditClient.createCreditEndpoint({creditCDto: {name: creditCDto.name, value: creditCDto.value, costInspectionId: selectedCostInspection.value.id}});
      await useInspectionStore().fetch();
    }
    creditCDto.value = undefined;
    creditCDto.name = undefined;
  };
  
  onClickOutside(target, async () => {
    createModus.value = false;
    creditCDto.value = undefined;
    creditCDto.name = undefined;
    emit("leave");
  });
  
  onKeyStroke("Enter", () =>{
    handleCreateCharge();
  })
  
  watchDeep(creditCDto, (newValue) => {
    if (newValue.value && newValue.name) {
      if (!validateValueInput()) {
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
  