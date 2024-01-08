<template>
    <div class="flex-1 flex h-full w-full justify-center">
      <FixedCostsCostOverviewChart />
    </div>

</template>

<script setup lang="ts">
import { useBudgetStore } from '~/stores/budgetStore';
import { useFixedCostStore } from '~/stores/fixedCostStore';
import { useOverviewCostStore } from '~/stores/overviewCostStore';

const loading = ref(false)


onMounted(async () => {
  loading.value = true;
  await useFixedCostStore().fetch();
  await useBudgetStore().fetch();
  await useOverviewCostStore().calulateCostOverview();
  loading.value = false;
});
</script>
<style>

</style>