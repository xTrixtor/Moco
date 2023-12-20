<template>
    <div class="h-full w-full flex justify-end border-4 rounded-lg rounded-bl-[2rem] rounded-tr-[2rem] border-brand px-4">
        <div class="h-full w-48 flex flex-col p-2">
            <div id="addButton" :class="baseButtonStyling" class="bg-indigo-500 hover:bg-indigo-400 " @click="() => addBudgetModalVis = true">
                Budget
                <Icon name="gridicons:add-outline" class="ml-2 text-2xl duration-500"/>
            </div>
            <div id="addButton" :class="baseButtonStyling" class="bg-green-500 hover:bg-green-400" @click="() => addFixedCostModalVis = true">
                Fix-Kosten
                <Icon name="gridicons:add-outline" class="ml-2 text-2xl duration-500"/>
            </div>
        </div>
        
    </div>
    <AddFixedCostModal v-model="addFixedCostModalVis"/>
    <AddBudgetModal v-model="addBudgetModalVis" />
</template>

<script setup lang="ts">
import AddFixedCostModal from './AddFixedCostModal.vue';
import AddBudgetModal from "./AddBudgetModal.vue"

const addFixedCostModalVis = ref(false)
const addBudgetModalVis = ref(false)


const baseButtonStyling = "text-white text-lg font-light flex-center rounded-lg my-2 px-2 py-1 cursor-pointer duration-300 hover:scale-110 hover:shadow-2xl hover:ring-2 ring-brand-500 hover:ring-offset-2"

</script>

<style scoped>
#addButton:hover{
    svg{
        @apply rotate-180;
    }
}
</style>