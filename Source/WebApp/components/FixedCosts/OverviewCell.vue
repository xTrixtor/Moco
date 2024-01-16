<template>
    <div class="h-8 px-1 flex items-center hover:bg-primary-dark hover:text-highlight-text hover:cursor-default duration-300 border-hightlight-bg text-secondary">
        <div class="w-1/2 pl-2">
            <p class="truncate">{{ props.name }}</p>
        </div>
        <div class="w-1/2">
            <p class="truncate ...">{{ props.value }} €</p>
        </div>
    </div>
</template>

<script setup lang="ts">
interface OverviewCellProps {
    name: string;
    value: number;
} 

const props = defineProps<OverviewCellProps>();

</script>

<style scoped>

</style>