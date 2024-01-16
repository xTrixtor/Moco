<template>
  <div >
    <div v-if="editModus" class="wrapper relative">
        <input
      v-model="inputValue"
      ref="target"
      :type="props.type"
      class="input outline-none bg-transparent py-1 caret-primary font-semibold text-primary border-r-2 border-border w-full relative"
      :class="inputStyling"
    />
    <span class="underline"></span>
    </div>
    <p v-else class="py-1 cursor-pointer h-full" :class="inputStyling" @click="handleLableClick">
      {{ inputValue + " " }}  {{ inputExtension??"" }}
    </p>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  modelValue: string;
  type:string;
  inputExtension?: string;
  labelStyling?: string;
  inputStyling?:string;
}>();
const emit = defineEmits(["update:modelValue", "leave"]);

const inputValue = useVModel(props, "modelValue", emit);
const editModus = ref(false);
const target = ref(null);
const { focused } = useFocus(target);

const handleLableClick = async () => {
  editModus.value = true;
  setTimeout(() => {
    focused.value = true;
  }, 10);
};

onClickOutside(target, async () => {
    editModus.value = false
    emit("leave")
});
</script>

<style scoped>

.wrapper {
  overflow:hidden
}

.input {
  background-color: transparent;
  border: none;
  box-sizing: border-box;
  position: relative;
}

.input:focus+.underline {
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
input[type=number] {
  -moz-appearance: textfield;
}
</style>
