<template>
  <div class="h-[88vh] w-full flex flex-col">
    <div
      class="h-[10vh] w-full bg-foreground flex-center justify-start gap-4 px-4 my-2 border-2 rounded-lg border-border"
    >
      <Dropdown
        class="w-1/5"
        v-model="selectedGoal"
        :options="savingGoals"
        placeholder="Bitte auswählen"
        optionLabel="name"
      />
      <Button @click="() => (showCreateDialog = true)" outlined
        ><Icon name="gridicons:add-outline" size="1.5rem" class=""
      /></Button>
      <div class="flex flex-1 gap-5">
        <div
          class="text-highlight-text text-lg w-1/12"
          v-if="selectedGoal.goalValue"
        >
          <p>Sparziel</p>
          <BaseEditInput
            v-model="selectedGoal.name"
            type="text"
            @leave="handleLeave"
          />
        </div>
        <div
          class="text-highlight-text w-1/12 text-lg"
          v-if="selectedGoal.goalValue"
        >
          <p>Ziel</p>
          <BaseEditInput
            v-model="selectedGoal.goalValue"
            type="text"
            @leave="handleLeave"
          />
        </div>
      </div>
    </div>
    <div class="h-[70vh] w-full flex flex-1" v-if="selectedGoal.id">
      <div class="flex-1 p-4">
        <SavingGoalsSavingGoalChart :selected-saving-goal="selectedGoal"/>
      </div>
      <div class="w-[500px]">
        <SavingGoalsDepositHistory :savingGoal="selectedGoal ?? []" />
      </div>
    </div>
    <div v-else>
      hallo
    </div>
  </div>
  <CreateSavingGoalModal v-model="showCreateDialog" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSavingGoalStore } from "~/stores/savingGoalStore";
import CreateSavingGoalModal from "~/components/SavingGoals/CreateSavingGoalModal.vue";
import { SavingGoalDto } from "~/stores/apiClient";

const savingGoalStore = useSavingGoalStore();
const { savingGoals } = storeToRefs(savingGoalStore);

const selectedGoal = ref<SavingGoalDto>({ name: "" });
const showCreateDialog = ref(false);

const handleLeave = () => {};

onBeforeMount(async () => {
  await savingGoalStore.fetch();
});
</script>

<style></style>
