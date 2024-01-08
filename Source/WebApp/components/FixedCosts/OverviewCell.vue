<template>
    <div class="w-full h-8 px-1 flex items-center ">
        <div class="w-2/3">
            <p class="truncate">{{ props.name }}</p>
        </div>
        <div class="w-1/3">
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