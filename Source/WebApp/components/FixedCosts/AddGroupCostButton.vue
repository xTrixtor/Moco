<template>
  <div :class="baseButtonStyling" class="flex-center pr-1">
    <div class="flex-center relative overflow-hidden">
      <AutoComplete
        v-model="newGroupCostName"
        dropdownMode="current"
        :completeOnFocus="true"
        @complete="search"
        :suggestions="suggestions"
        :pt="{ input: { class: 'p-2' }, root: { class: 'h-8' }, panel:{class:'px-2'} }"
        :emptySearchMessage="'Drücke Enter zum Erstellen dieser Kosten-Gruppe'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { GroupCostCDto } from "~/stores/apiClient";
import { useApiStore } from "~/stores/apiStore";
import { useFixedCostStore } from "~/stores/fixedCostStore";
import { getGroupcostSuggestions } from "@/metaData/suggestionData";

const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);
const suggestions = ref<string[]>([]);

const showAutoCompleteField = useVModel(props, "modelValue", emit);
const apiStore = useApiStore();
const fixedCostStore = useFixedCostStore();

const newGroupCostName = ref<string>();
const inputFocused = ref(false);

const createGroupCost = async () => {
  if (newGroupCostName) {
    await apiStore.GroupcostClient.createGroupCostEndpoint({
      name: newGroupCostName.value,
    } as GroupCostCDto);
    await fixedCostStore.fetch();

    clear();
  }
};

const search = (event: any) => {
  const copy = [...suggestions.value];
  suggestions.value = event.query
    ? copy.filter((x) =>
        x.toLocaleLowerCase().includes(event.query.toLocaleLowerCase())
      )
    : getGroupcostSuggestions();
};

const clear = () => {
  newGroupCostName.value = "";
  showAutoCompleteField.value = false;
  inputFocused.value = false;
};
const baseButtonStyling =
  "text-lg font-light flex-center rounded-lg my-2 px-2 py-1 cursor-pointer";

const target = ref(null);

onClickOutside(target, () => {
  if (!inputFocused.value && !newGroupCostName.value) {
    clear();
  }

  inputFocused.value = false;
});

watch(newGroupCostName, (newVal) => {});

onKeyStroke("Enter", async (e) => {
  if (props.modelValue && newGroupCostName.value) {
    await createGroupCost();
  }
});

onKeyStroke("Escape", async (e) => {
  clear();
});

onMounted(() => {
  suggestions.value = getGroupcostSuggestions();
});
</script>

<style scoped>
#createGroupCostInput {
  @apply !px-0;
}
</style>
