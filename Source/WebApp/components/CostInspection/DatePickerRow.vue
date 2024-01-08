
<template>
    <div class="w-full flex-1 flex-center my-4 !cursor-pointer h-20">
        <div @click="previousMonth" id="datePickerIcon" class="flex-center flex-1">
            <Icon name="bxs:left-arrow" size="2rem" class="text-border"/>
        </div>
        <input type="month" v-model="selectedMonthyYear" class="p-2 border-2 rounded-sm border-primary w-1/3 !cursor-pointer bg-foreground" />
        <div id="datePickerIcon" class="flex-center flex-1 duration-300" @click="nextMonth">
            <Icon name="bxs:right-arrow" class="text-border" size="2rem"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns';
import { addMonths } from 'date-fns';
import { storeToRefs } from 'pinia';
import { useInspectionStore } from '~/stores/costInspectionStore';

const formatToMonthString = (date:Date): String => {
    return format(date, "yyyy-MM")
}

const { selectedDate } = storeToRefs(useInspectionStore())

const selectedMonthyYear = computed(() => formatToMonthString(selectedDate.value))

const nextMonth = async () => {
    const prevMonthDate = addMonths(selectedDate.value, 1);
    selectedDate.value = prevMonthDate;
    await useInspectionStore().fetch()
}
const previousMonth = async () => {
    const nextMonthDate = addMonths(selectedDate.value, -1);
    selectedDate.value = nextMonthDate
    await useInspectionStore().fetch()
}

</script>

<style scoped>
#datePickerIcon:hover{
    svg{
        @apply bg-transparent text-primary border-b-2 border-primary;
    }
}

::-webkit-calendar-picker-indicator {
    filter: invert(1);
}
</style>