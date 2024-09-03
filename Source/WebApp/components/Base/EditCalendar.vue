<template>
  <div>
    <div v-if="editModus" class="wrapper relative gap-1 flex-center" ref="target">
      <Calendar
        v-model="dateValue"
        :pt="{ input: { class: 'p-[2px] pl-2' } }"
      />
      <div class="w-14 h-8 flex-center bg-slate-50/20 p-1 rounded-lg hover:bg-primary cursor-pointer duration-500" @click="handleSave">
        <Icon
          name="material-symbols:save-outline"
          size="1rem"
        />
      </div>
    </div>
    <p
      v-else
      class="py-1 cursor-pointer h-full"
      :class="inputStyling"
      @click="handleLableClick"
    >
      {{ formatDate(dateValue, props.format) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import Calendar from "primevue/calendar";
import { formatDate } from "@vueuse/core";

const props = defineProps<{
  modelValue: Date;
  format: string;
  labelStyling?: string;
  inputStyling?: string;
}>();
const emit = defineEmits(["update:modelValue", "leave"]);

const dateValue = useVModel(props, "modelValue", emit);
const intialValue = props.modelValue;
const editModus = ref(false);
const target = ref(null);
const { focused } = useFocus(target);

const handleLableClick = async () => {
  editModus.value = true;
  setTimeout(() => {
    focused.value = true;
  }, 10);
};

const handleSave = () => {
  emit("leave");
  editModus.value = false;
};
</script>

<style scoped>
.wrapper {
  overflow: hidden;
}

.input {
  background-color: transparent;
  border: none;
  box-sizing: border-box;
  position: relative;
}

.input:focus + .underline {
  transform: translateX(-100%);
}

.underline {
  background-color: var(--primary-color);
  height: 2px;
  transform: translateX(0%);
  position: absolute;
  bottom: 0px;
  transition: all 0.2s linear;
  width: 100%;
}

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
