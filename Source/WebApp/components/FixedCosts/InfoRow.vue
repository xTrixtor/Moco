<template>
    <div class="xl:h-[15vh] w-full flex flex-col xl:flex-row justify-between items-center border-2 border-border rounded-lg rounded-bl-[2rem] rounded-tr-[2rem] shadow-lg mb-2">
        <div class="w-full grid xl:grid-rows-3 xl:grid-cols-6 md:grid-cols-2 grid-cols-1 xl:grid-flow-col bg-primary-content rounded-xl mx-2" >
            <OverviewCell v-for="(overviewCost, key) in overviewCosts" :key="key" :name="overviewCost.name" :value="overviewCost.value" :class="[key%2===0?'bg-primary-light':'bg-primary-dark', selectedOverviewCost === overviewCost?'duration !bg-secondary text-white':'']"/>
            <OverviewCell v-for="(groupCost, key) in groupCostOptions" :key="key" :name="groupCost.name" :value="groupCost.sum" :class="[key%2===0?'bg-primary-light':'bg-primary-dark', selectedGroupCost.id===groupCost.id?'duration-500 !bg-secondary text-white':'']"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useOverviewCostStore } from "~/stores/overviewCostStore";
import OverviewCell from "./OverviewCell.vue";
import { storeToRefs } from "pinia";
import { useFixedCostStore } from "~/stores/fixedCostStore";

const addBudgetModalVis = ref(false)
const {overviewCosts, selectedOverviewCost} = storeToRefs(useOverviewCostStore())
const {selectedGroupCost, groupCostOptions} = storeToRefs(useFixedCostStore())

</script>

<style scoped>
#addButton:hover{
    svg{
        @apply rotate-180;
    }
}
</style>