<template>
  <div v-if="selectedSavingGoal" class="flex flex-1 w-full gap-5">
    <div
      class="text-highlight-text text-lg w-full max-w-sm truncate"
      v-if="selectedSavingGoal.goalValue"
    >
      <p>Sparziel</p>
      <p>{{ selectedSavingGoal.name }}</p>
    </div>

    <div :class="cellStyling" v-if="selectedSavingGoal.startDate">
      <p>Start-Datum</p>
      <p>{{ formatDate(selectedSavingGoal.startDate, "MMMM YYYY") }}</p>
    </div>
    <div :class="cellStyling" v-if="selectedSavingGoal.endDate">
      <p>End-Datum</p>
      <p>{{ formatDate(selectedSavingGoal.endDate, "MMMM YYYY") }}</p>
    </div>
    <div :class="cellStyling" v-if="selectedSavingGoal.goalValue">
      <p>Raten</p>
      <p>{{ selectedSavingGoal.depositRate }}</p>
    </div>
    <div :class="cellStyling" v-if="selectedSavingGoal.goalValue">
      <p>Ziel</p>
      <p>{{ selectedSavingGoal.goalValue }}</p>
    </div>
    <div :class="cellStyling" v-if="selectedSavingGoal.goalValue">
      <p>Gespart</p>
      <p>{{ useRound(selectedSavingGoal.currentSaving, 2) }} €</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSavingGoalStore } from "~/stores/savingGoalStore";
import { formatDate } from "@vueuse/core";

const { selectedSavingGoal } = storeToRefs(useSavingGoalStore());

// import { useConfirm } from "primevue/useconfirm";
// import { useToast } from "primevue/usetoast";
// const confirm = useConfirm();
// const toast = useToast();
// const handleLeave = (event:any) => {
//   confirm.require({
//     message:
//       "Sind sie sicher diesen Wert zu ändern? Beim Bestätigen werden alle Raten neu berechnet und aktualisiert. Dies kann wenige Sekunden dauern",
//     accept: () => {
//       toast.add({
//         severity: "info",
//         summary: "Confirmed",
//         detail: "You have accepted",
//         life: 3000,
//       });
//     },
//     reject: () => {
//       toast.add({
//         severity: "error",
//         summary: "Rejected",
//         detail: "You have rejected",
//         life: 3000,
//       });
//     },
//   });
// };
const cellStyling = "text-highlight-text text-lg w-full max-w-sm truncate";
</script>

<style scoped></style>
