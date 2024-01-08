<template>
  <div ref="target" :class="baseButtonStyling" class="flex-center pr-1">
      <div class="flex-center">
        <el-autocomplete
          effect="dark"
          v-model="newGroupCostName"
          :fetch-suggestions="querySearch"
          clearable
          placeholder="Gruppierung"
          @select="handleSelect"
          id="createGroupCostInput"
          @focus="() => (inputFocused = true)"
          @clear="handleClear"
        />
        <Icon
          name="gridicons:add-outline"
          class="text-green-500 text-xl duration-500"
          @click="createGroupCost"
        />
      </div>
  </div>
</template>

<script setup lang="ts">
import { GroupCostCDto } from "~/stores/apiClient";
import { useApiStore } from "~/stores/apiStore";
import { useFixedCostStore } from "~/stores/fixedCostStore";
import {
  AutoCompleteSuggestion,
  getGroupcostSuggestions,
} from "@/metaData/suggestionData";

const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);

const showAutoCompleteField = useVModel(props, "modelValue", emit);
const apiStore = useApiStore();
const fixedCostStore = useFixedCostStore();

const newGroupCostName = ref<string>("");
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

const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? getGroupcostSuggestions().filter(createFilter(queryString))
    : getGroupcostSuggestions();
  cb(results);
};
const createFilter = (queryString: string) => {
  return (groupcost: AutoCompleteSuggestion) => {
    return (
      groupcost.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
};

const handleSelect = (item: AutoCompleteSuggestion) => {
  newGroupCostName.value = item.value;
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
  if(!inputFocused.value && !newGroupCostName.value){
    clear();
  }

  inputFocused.value = false;
});

const handleClear= () =>{
  clear();
}

onKeyStroke("Enter", async (e) => {
  if (props.modelValue && newGroupCostName.value) {
    await createGroupCost();
  }
});

onKeyStroke("Escape", async (e) => {
  clear();
});

onMounted(() => {
  getGroupcostSuggestions();
});
</script>

<style scoped>
#createGroupCostInput {
  @apply !px-0;
}
</style>
