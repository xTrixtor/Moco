<template>
    <div class="flex px-4 py-2">
        <p class="flex-1 flex items-center text-lg">{{timeInterval}}</p>
        <BasePrimaryButton btn-txt="Add Charge" :on-click="handleAddChargeClick"/>
        <BudgetCreateChargeModal :title="timeInterval" v-model="showCreateChargeModal"/>
    </div>
</template>

<script setup lang="ts">
import { ChargeDto, TimeInterval, Catecory } from '~/stores/apiClient';
interface ChargeAddHeaderProps{
    timeInterval: string;
    addCharge: (charge:ChargeDto) => void;
}
const props = defineProps<ChargeAddHeaderProps>()

const showCreateChargeModal = ref<boolean>(false);
const timeInterval = computed(() => TimeInterval[+props.timeInterval])

const handleAddChargeClick = () =>{
    showCreateChargeModal.value = true
}

const newCharge = {
    chargeName: "hallo",
    timeInterval: +props.timeInterval,
    catecory : Catecory.Vertraglich,
    value : 500.66
    } as ChargeDto
</script>

<style scoped>

</style>