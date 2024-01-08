<template>
  <div class="bg-white rounded-lg border-2 border-zinc-400">
    <p
      class="text-center py-2 font-semibold text-lg border-b-2 border-zinc-400 flex-1"
    >
      {{ TimeInterval[+props.interval] }}
    </p>
    <div
      v-if="props.charges"
      class="flex-1 h-full w-full flex justify-center p-2"
    >
      <div class="flex w-full justify-between">
        <div class="flex">
          <p class="font-semibold">Summe:</p>
          <p class="px-2">
            a
            €
          </p>
        </div>
        <button
          @click="() => (modalVis = true)"
          class="px-2 text-primary underline"
        >
          Details
        </button>
        <ChargeModal
          v-model="modalVis"
          :interval="TimeInterval[+props.interval]"
          :charges="props.charges"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
ChargeDto,
  TimeInterval,
} from "~/stores/apiClient";

interface ChargeCardProps {
  interval: string;
  charges?: ChargeDto[];
}

const props = defineProps<ChargeCardProps>();

const modalVis = ref(false);
</script>

<style scoped></style>
