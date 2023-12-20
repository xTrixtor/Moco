<template>
    <FixedCostsInfoRow/>
    <div class="flex flex-col 2xl:flex-row">
        <div class="bg-slate-50 h-full flex-1 md:h-[80vh] flex flex-col md:flex-wrap items-start my-4">
            <GroupCostCard :groupCost="group" v-for="group in groupCosts"/>
        </div>
        <div class="h-full w-full 2xl:w-[450px] bg-brand">
            a
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import GroupCostCard from '~/components/FixedCosts/GroupCostCard.vue';
import { useFixedCostStore } from '~/stores/fixedCostStore';

const {groupCosts} = storeToRefs(useFixedCostStore())


export interface SmartIntervalKey {
    timeIntervalKey: number;
    intervalString: string;
    isEmpty:boolean;
}

onMounted(async() =>{
    await useFixedCostStore().fetch();
})

</script>

<style scoped>

</style>