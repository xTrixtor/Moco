<template>
  <InputText
    v-model="displayValue"
    @blur="updateCents"
    @focus="handleFocus"
    :placeholder="placeholder"
    :class="inputClass"
    :disabled="disabled"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  placeholder: {
    type: String,
    default: "0,00 €",
  },
  inputClass: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

// Initialize with the formatted euro string
const displayValue = ref("");

// Helper to format cents into "10,50" (without the € symbol for the input field to keep it clean)
const formatForInput = (cents: number | undefined | null) => {
  if (cents == null || isNaN(cents)) return "0,00";
  return (cents / 100).toFixed(2).replace(".", ",");
};

// Start formatted
displayValue.value = formatForInput(props.modelValue);

// When the parent changes the property from the outside
watch(
  () => props.modelValue,
  (newVal) => {
    // Only update if it actually differs from what we would have generated,
    // to prevent cursor jumping or infinite loops.
    const expectedVal = Math.round(
      parseFloat(displayValue.value.replace(",", ".")) * 100,
    );
    if (isNaN(expectedVal) || expectedVal !== newVal) {
      displayValue.value = formatForInput(newVal);
    }
  },
);

const handleFocus = (event: Event) => {
  // Optional: Auto-select the text when clicking into the field
  const target = event.target as HTMLInputElement;
  if (target) {
    target.select();
  }
};

const updateCents = () => {
  if (!displayValue.value) {
    displayValue.value = "0,00";
    emit("update:modelValue", 0);
    return;
  }

  // Convert comma to dot for parsing: "10,50" -> "10.50"
  let stringVal = displayValue.value.replace(",", ".");

  // Clean up any non-numeric characters (except dot and minus) just in case they pasted "€"
  stringVal = stringVal.replace(/[^\d.-]/g, "");

  const parsedFloat = parseFloat(stringVal);

  if (!isNaN(parsedFloat)) {
    // Convert to cents and round to avoid JS floating point errors
    const cents = Math.round(parsedFloat * 100);
    emit("update:modelValue", cents);

    // Reformat nicely inside the input
    displayValue.value = formatForInput(cents);
  } else {
    // Revert to prop value if invalid
    displayValue.value = formatForInput(props.modelValue);
  }
};
</script>
