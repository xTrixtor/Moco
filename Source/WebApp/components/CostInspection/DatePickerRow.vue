
<template>
    <div class="w-full flex-1 flex-center my-4 !cursor-pointer h-20">
        <div @click="previousMonth" id="datePickerIcon" class="flex-center flex-1">
            <Icon name="bxs:left-arrow" size="2rem" class="text-border"/>
        </div>
        <Calendar view="month" dateFormat="M-yy" v-model="selectedDate" showIcon iconDisplay="input" class="w-1/4" @date-select="handleChange" @month-change="handleChange" @year-change="handleChange"/>
        <div id="datePickerIcon" class="flex-center flex-1 duration-300" @click="nextMonth">
            <Icon name="bxs:right-arrow" class="text-border" size="2rem"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { addMonths } from 'date-fns';
import { storeToRefs } from 'pinia';
import { useInspectionStore } from '~/stores/costInspectionStore';
import Calendar from 'primevue/calendar';

const { selectedDate } = storeToRefs(useInspectionStore())

const handleChange = async () => {
    await useInspectionStore().fetch()
}

onKeyStroke("ArrowLeft", async () =>{
    await previousMonth();
})

onKeyStroke("ArrowRight", async () =>{
    await nextMonth();
})

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