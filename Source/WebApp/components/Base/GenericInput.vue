<template>
    <InputText ref="target" v-model="bindValue" :type="props.type"/>
</template>

<script setup lang="ts">
export interface GenericInputProps{
    workObject: any;
    bindProperty:string;
    type:string;
}

const props = defineProps<GenericInputProps>()
const emit = defineEmits(["inputChange"])

const bindValue = ref(props.workObject[props.bindProperty])

watch(bindValue, newVal =>{
    emit("inputChange", props.bindProperty, newVal)
})
</script>

<style scoped>
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