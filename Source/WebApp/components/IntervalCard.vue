<template>
  <div class="bg-white rounded-lg shadow-brand shadow-lg h-20">
    <div
      v-if="props.charges"
      v-for="(charge, key) in props.charges"
      class="flex-1 h-full w-full flex justify-center p-2"
    >
      {{ charge.chargeName }}
      {{ charge.timeInterval }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  MocoApiModelsMocoDtoChargeDto,
  TimeInterval,
} from "~/stores/apiClient";

interface ChargeCardProps {
  interval: string;
  charges: MocoApiModelsMocoDtoChargeDto[];
}
const props = defineProps<ChargeCardProps>();
</script>

<style scoped></style>
