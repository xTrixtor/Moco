<template>
    <div class="grid grid-cols-4 gap-3 p-4">
        <div v-for="(smartIntervalKey, key) in smartKeys" :key="key">
            <div v-if="smartIntervalKey.isEmpty">
                <BudgetEmptyChargeCard :time-interval="smartIntervalKey.intervalString"/>
            </div>
            <div v-else>
                <BudgetChargeCard v-if="groupedCharges"  :time-interval="smartIntervalKey.intervalString" :charges="groupedCharges[+smartIntervalKey.intervalString]"/>
            </div>
        </div>
    </div>
    <BudgetChangeDataGrid/>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { TimeInterval } from '~/stores/apiClient';
import { useChargeStore } from '~/stores/chargeStore';

const chargeStore = useChargeStore();
const {groupedCharges} = storeToRefs(chargeStore)

const allKeys = Object.keys(TimeInterval).filter((item) => {
    return !isNaN(Number(item));
});
const keysWithValue = computed(() => Object.keys(groupedCharges.value ?? ""));
const smartKeys = computed(() => createSmartKeys())
interface SmartIntervalKey {
    intervalString: string;
    isEmpty:boolean;
}

const createSmartKeys = () => allKeys.map((intervalString:string) => {
    if(keysWithValue.value.includes(intervalString))
        return {intervalString, isEmpty:false} as SmartIntervalKey;
    else
        return {intervalString, isEmpty:true} as SmartIntervalKey;
})

onMounted(async()=>{
    await chargeStore.fetch();
});
</script>

<style scoped>

</style>