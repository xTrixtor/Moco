<template>
    <div class="flex flex-col bg-brand p-1 h-[400px] rounded-sm">
        {{ $props.smartIntervalKey.intervalString }}
    </div>
</template>

<script setup lang="ts">
import { SmartIntervalKey } from '~/pages/budget/index.vue';
import { ChargeDto } from '~/stores/apiClient';

interface EmptyChargeCardProps{
    smartIntervalKey: SmartIntervalKey
}

const props = defineProps<EmptyChargeCardProps>()


</script>
