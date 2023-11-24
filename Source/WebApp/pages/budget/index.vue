<template>
    <div class="grid grid-cols-3 gap-3 p-4">
        <div v-for="(smartIntervalKey, key) in smartKeys" :key="key">
            <div v-if="smartIntervalKey.isEmpty">
                <BudgetEmptyChargeCard :smart-interval-key="smartIntervalKey"/>
            </div>
            <div v-else>
                <BudgetChargeCard v-if="groupedCharges" :smart-interval-key="smartIntervalKey" :charges="groupedCharges[+smartIntervalKey.intervalString]"/>
            </div>
        </div>
    </div>
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
export interface SmartIntervalKey {
    timeIntervalKey: number;
    intervalString: string;
    isEmpty:boolean;
}

const createSmartKeys = () => allKeys.map((intervalKey) => {
    if(keysWithValue.value.includes(intervalKey))
        return {intervalString: TimeInterval[+intervalKey], timeIntervalKey: +intervalKey, isEmpty:false} as SmartIntervalKey;
    else
        return {intervalString: TimeInterval[+intervalKey], timeIntervalKey: +intervalKey, isEmpty:true} as SmartIntervalKey;
})

onMounted(async()=>{
    await chargeStore.fetch();
});
</script>

<style scoped>

</style>