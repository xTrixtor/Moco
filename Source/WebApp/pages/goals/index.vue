<template>
    <div class="w-full">
        <Calendar view="month" dateFormat="yy-MM" v-model="date" showButtonBar />
        <InputText type="text" v-model="value" class="p-2 text-black mx-2" />
    </div>
</template>

<script setup lang="ts">
import Calendar from 'primevue/calendar';

const date = ref();
const value = ref();
</script>

<style scoped>

</style>