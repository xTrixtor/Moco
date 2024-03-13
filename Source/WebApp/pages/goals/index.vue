<template>
  <div class="h-full w-full flex flex-col">
    <div
      class="h-[10vh] w-full bg-foreground flex items-center gap-4 px-4 my-2 border-2 rounded-lg border-border"
    >
      <div class="flex flex-1 gap-2">
        <Button @click="() => (showCreateDialog = true)" outlined
          ><Icon name="gridicons:add-outline" size="1.5rem" class=""
        /></Button>
        <Dropdown
          :pt="{root:{class:'w-80'}}"
          v-model="selectedSavingGoal"
          :options="savingGoals"
          placeholder="Bitte auswählen"
          optionLabel="name"
          @change="(item:any) => handleChange(item.value)"
        />
      </div>
      <div v-if="selectedSavingGoal" class="flex flex-1 gap-5">
        <div
          class="text-highlight-text text-lg w-full max-w-xs truncate"
          v-if="selectedSavingGoal.goalValue"
        >
          <p>Sparziel</p>
          <BaseEditInput
            v-model="selectedSavingGoal.name"
            type="text"
            @leave="handleLeave"
          />
        </div>
        <div
          class="text-highlight-text text-lg w-full max-w-xs truncate"
          v-if="selectedSavingGoal.goalValue"
        >
          <p>Raten</p>
          <BaseEditInput
            v-model="selectedSavingGoal.depositRate"
            type="number"
            input-extension="€"
            @leave="handleLeave"
          />
        </div>
        <div
          class="text-highlight-text text-lg w-full max-w-xs truncate"
          v-if="selectedSavingGoal.goalValue"
        >
          <p>Ziel</p>
          <BaseEditInput
            v-model="selectedSavingGoal.goalValue"
            type="number"
            input-extension="€"
            @leave="handleLeave"
          />
        </div>
        <div
          class="text-highlight-text text-lg w-full max-w-xs truncate"
          v-if="selectedSavingGoal.goalValue"
        >
          <p>Gespart</p>
          <p>{{ selectedSavingGoal.goalValue }} €</p>
        </div>
      </div>
      <div v-if="selectedSavingGoal">
        <Icon
          class="flex justify-center items-center cursor-pointer text-red-600 duration-300 opacity-60 hover:opacity-100"
          size="2rem"
          name="material-symbols:delete-outline"
          @click="handleDelete"
        />
      </div>
    </div>
    <div class="h-[70vh] w-full flex flex-1" v-if="selectedSavingGoal">
      <div class="flex-1 p-4">
        <SavingGoalsSavingGoalChart
          :selected-saving-goal="selectedSavingGoal"
        />
      </div>
      <div class="w-[500px]">
        <SavingGoalsDepositHistory :savingGoal="selectedSavingGoal ?? []" />
      </div>
    </div>
    <div v-else>Bitte auswählen</div>
  </div>
  <CreateSavingGoalModal v-model="showCreateDialog" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSavingGoalStore } from "~/stores/savingGoalStore";
import CreateSavingGoalModal from "~/components/SavingGoals/CreateSavingGoalModal.vue";
import { SavingGoalDto } from "~/stores/apiClient";
import { useConfirm } from "primevue/useconfirm";
import { useApiStore } from "~/stores/apiStore";
const savingGoalStore = useSavingGoalStore();
const { savingGoals } = storeToRefs(savingGoalStore);
const { selectedSavingGoal } = storeToRefs(useSavingGoalStore());

const showCreateDialog = ref(false);

const confirm = useConfirm();
const handleChange = (savingGoal: SavingGoalDto) => {
  selectedSavingGoal.value = savingGoal;
};
const handleDelete = () => {
  confirm.require({
        message: 'Willst du dieses Sparziel löschen?',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
        acceptClass: 'p-button-sm',
        rejectLabel: 'Schließen',
        acceptLabel: 'Löschen',
        accept: () => {
            useApiStore().SavingGoalsClient.deleteSavingGoalEndpoint(selectedSavingGoal.value.id)
            selectedSavingGoal.value = undefined;
            savingGoalStore.fetch();
        },
        reject: () => {
        }
    });
};

onBeforeMount(async () => {
  await savingGoalStore.fetch();
});

const handleLeave = () => {
  
}
</script>

<style></style>
