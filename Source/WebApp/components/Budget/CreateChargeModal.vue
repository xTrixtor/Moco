<template>
    <el-dialog
    v-model="modalVisibility"
    :title="'Kosten für '+ props.title +' hinzufügen'"
    width="50%"
    :before-close="handleClose"
  >
  <div class="flex flex-col">
    <CustomInput
      type="text"
      placeholder="Name"
      styling="!bg-secondary !text-white"
      v-model="newCharge.name"
    />
    <el-select v-model="newCharge.timeInterval" class="" placeholder="Select" size="large">
        <el-option
          v-for="timeIntervalKey in timeIntervalList"
          :key="timeIntervalKey"
          :label="TimeInterval[+timeIntervalKey]"
          :value="TimeInterval[+timeIntervalKey]"
        />
    </el-select>
    <el-select v-model="newCharge.catecory" class="" placeholder="Select" size="large">
        <el-option
          v-for="catecoryKey in catecories"
          :key="catecoryKey"
          :label="Catecory[+catecoryKey]"
          :value="Catecory[+catecoryKey]"
        />
    </el-select>
  </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleAddChargeClick">Hinzufügen</el-button>
        <el-button @click="modalVisibility = false">Schließen</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import CustomInput from "@/components/Base/CustomInput.vue";
import { Catecory, ChargeDto, TimeInterval } from '~/stores/apiClient';

interface CreateCardProps {
  modelValue: boolean;
  title: string;
}
const props = defineProps<CreateCardProps>();

onKeyStroke("Esc", async (e) => {
  modalVisibility.value = false;
});

const handleAddChargeClick = () => {
    console.log(newCharge.value)
}

const handleClose = () => {
  modalVisibility.value = false;
};
const emit = defineEmits(["update:modelValue"]);

const modalVisibility = useVModel(props, "modelValue", emit);
const timeIntervalList = Object.keys(TimeInterval).filter((item) => {
    return !isNaN(Number(item));
});
const catecories = Object.keys(Catecory).filter((item) => {
    return !isNaN(Number(item));
});
interface ChargeCDto {
    name:string;
    timeInterval: string;
    catecory? : Catecory;
}
const newCharge = ref<ChargeCDto>({name:"", timeInterval:"" });
</script>

<style scoped>

</style>