<template>
  <Dialog
    v-if="data"
    modal
    class="m-4 lg:w-1/3"
    v-model:visible="data"
    header="Gehalt hinzufügen"
  >
    <div class="w-full h-full py-4 px-1">
      <div class="flex items-center">
        <p class="w-1/2 !text-white">Name</p>
        <BaseCustomInput
          v-model="revenueCDTO.source"
          type="text"
          placeholder="Name"
          :clearable="true"
        />
      </div>
      <div class="flex">
        <p class="w-1/2 flex items-center !text-white">Gehalt</p>
        <BaseCustomInput
          v-model="revenueCDTO.value"
          type="number"
          placeholder="Gehalt"
          :clearable="true"
        />
      </div>
      <div class="flex flex-row-reverse justify-between">
        <div
          :class="
            allowedToSafe
              ? 'bg-secondary border-border hover:shadow-secondary hover:bg-secondary-light hover:cursor-pointer hover:scale-110 hover:-translate-y-1 duration-300 shadow-lg'
              : 'bg-gray-300 border-slate-300 cursor-not-allowed'
          "
          class="w-10 h-10 flex items-center justify-center rounded-full mt-2"
        >
          <Icon
            name="material-symbols:save-outline"
            class="text-white w-full h-full p-1"
            @click="handleCreateRevenue()"
          />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import type { RevenueDto } from "~/stores/apiClient";
import { useApiStore } from "~/stores/apiStore";

interface AddChargeModalProps {
  modelValue: boolean;
}

const props = defineProps<AddChargeModalProps>();
const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emit);
let revenueCDTO = reactive<RevenueDto>({} as RevenueDto);

let revenues: Ref<RevenueDto[]> = inject("revenues") ?? 0;

const isAdding = ref(false);
const allowedToSafe = computed(() => {
  return revenueCDTO.value && revenueCDTO.source;
});

const clear = () => {
  isAdding.value = false;
  revenueCDTO = {} as RevenueDto;
};

const handleCreateRevenue = async () => {
  if (allowedToSafe.value) {
    const response = await useApiStore().RevenueClient.createRevenueEndpoint({ revenue: revenueCDTO });
    revenues.value = [...revenues.value, response.newRevenueDto];
    data.value = !data.value;
  }
  clear();
};

onKeyStroke("Enter", async (e) => {
  if (props.modelValue) {
    await handleCreateRevenue();
  }
});

onKeyStroke("Escape", async (e) => {
  data.value = false;
});
</script>

<style>
.el-dialog__body {
  @apply px-4 py-2;
}

#addButton:hover {
  svg {
    @apply duration-500 rotate-180;
  }
}
</style>
