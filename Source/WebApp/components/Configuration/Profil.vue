<template>
  <div class="flex-1 divide-y-2 p-4 text-lg text-highlight-text">
    <div class="flex bg-primary">
      <div class="w-1/2 p-2">Name</div>
      <div class="w-1/2 p-2">Wert</div>
    </div>
    <div
      class="flex text-sm"
      v-for="(probValue, key) in profilConfig"
      :class="key % 2 ? 'bg-slate-300/20' : 'bg-secondary-content'"
    >
      <div class="w-1/2 p-2">{{ probValue.label }}</div>
      <div class="w-1/2 p-2">{{ user[probValue.propKey] }}</div>
    </div>
    <div
      class="flex text-sm"
      :class="key % 2 ? 'bg-slate-300/20' : 'bg-secondary-content'"
    >
      <div class="w-1/2 p-2">Gehalt</div>
      <div class="w-1/2 p-2">
        <BaseEditInput
          v-model="revenue.value"
          @leave="updateRevenue()"
          :input-extension="'€'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RevenueDto, UpdateRevenueRequest, UserDto } from "~/stores/apiClient";
import { useApiStore } from "~/stores/apiStore";
import { useUserStore } from "~/stores/userStore";

interface PropertyValue {
  propKey: String;
  label: String;
}

const revenueClient = useApiStore().RevenueClient;
const loading = ref(false);

const revenue: Ref<RevenueDto> = ref({ value: 0 });
const user = computed(() => useUserStore().getUser);

const profilConfig: PropertyValue[] = [
  { label: "Id", propKey: "sub" },
  { label: "Vorname", propKey: "given_name" },
  { label: "Nachname", propKey: "family_name" },
  { label: "Email", propKey: "email" },
];

onMounted(async () => {
  loading.value = true;
  const revenues = (await revenueClient.getRevenuesEndpoint()).revenues;

  revenue.value = revenues[0];

  loading.value = false;
});

const updateRevenue = async () => {
  const request: UpdateRevenueRequest = {
    uRevenueDto: { id: revenue.value.id, value: revenue.value.value },
  };
  await revenueClient.updateRevenueEndpoint(request);
};
</script>

<style scoped></style>
