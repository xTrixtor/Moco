<template>
  <div class="h-full w-full flex flex-col">
    <div
      class="h-[10vh] w-full bg-foreground flex items-center gap-4 px-4 my-2 border-2 rounded-lg border-border"
    >
      <div class="flex gap-2">
        <Button @click="() => (showCreateDialog = true)" outlined
          ><Icon name="gridicons:add-outline" size="1.5rem" class=""
        /></Button>
        <Dropdown
          :pt="{ root: { class: 'w-80' } }"
          v-model="selectedSavingGoal"
          :options="savingGoals"
          placeholder="Bitte auswählen"
          optionLabel="name"
          data-key="id"
          @change="(item: any) => handleChange(item.value)"
        />
      </div>
      <div class="p-2 flex-1 border-x-2 border-border">
        <OverviewRow />
      </div>
      <div v-if="selectedSavingGoal.id">
        <Icon
          class="flex justify-center items-center cursor-pointer text-red-600 duration-300 opacity-60 hover:opacity-100"
          size="2rem"
          name="material-symbols:delete-outline"
          @click="handleDelete"
        />
      </div>
    </div>
    <div class="h-[70vh] w-full flex flex-1" v-if="selectedSavingGoal.id">
      <div class="flex-1 p-4">
        <SavingGoalsSavingGoalChart
          :selected-saving-goal="selectedSavingGoal"
        />
      </div>
      <div v-if="selectedSavingGoal.id" class="w-[500px]">
        <SavingGoalsDepositHistory />
      </div>
    </div>
    <div v-else class="w-full h-full flex-center">
      <div
        class="bg-foreground border-2 border-border grid place-items-center w-full h-[75svh] rounded-lg"
      >
        <div
          class="text-5xl flex flex-col items-center justify-center gap-8 text-highlight-text"
        >
          <div class="border-4 rounded-full flex-center p-10 bg-primary">
            <Icon name="icon-park-outline:search" size="7rem" />
          </div>
          <p class="underlineAnimation">Bitte wähle ein Ziel aus</p>
        </div>
      </div>
    </div>
  </div>
  <CreateSavingGoalModal v-model="showCreateDialog" />
</template>

<script setup lang="ts">
import CreateSavingGoalModal from "~/components/SavingGoals/CreateSavingGoalModal.vue";
import OverviewRow from "~/components/SavingGoals/OverviewRow.vue";
import { storeToRefs } from "pinia";
import { useSavingGoalStore } from "~/stores/savingGoalStore";
import { SavingGoalDto } from "~/stores/apiClient";
import { useConfirm } from "primevue/useconfirm";
import { useApiStore } from "~/stores/apiStore";
const savingGoalStore = useSavingGoalStore();
const { selectedSavingGoal, savingGoals } = storeToRefs(savingGoalStore);

const showCreateDialog = ref(false);

const confirm = useConfirm();
const handleChange = (savingGoal: SavingGoalDto) => {
  useApiStore()
    .SavingGoalsClient.getSavingGoalEnpoint(savingGoal.id)
    .then((response) => {
      selectedSavingGoal.value = response.savingGoalDto;
    });
};

const handleDelete = () => {
  confirm.require({
    message: "Willst du dieses Sparziel löschen?",
    icon: "pi pi-exclamation-triangle",
    rejectClass: "p-button-secondary p-button-outlined p-button-sm",
    acceptClass: "p-button-sm",
    rejectLabel: "Schließen",
    acceptLabel: "Löschen",
    accept: async () => {
      await useApiStore().SavingGoalsClient.deleteSavingGoalEndpoint(
        selectedSavingGoal.value.id,
      );
      savingGoalStore.fetch();
      selectedSavingGoal.value = { id: undefined };
    },
    reject: () => {},
  });
};

onBeforeMount(async () => {
  await savingGoalStore.fetch();
});
</script>

<style></style>
