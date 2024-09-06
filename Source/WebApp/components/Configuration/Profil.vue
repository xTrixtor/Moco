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
      <div class="w-1/2 p-2 truncate">{{ user[probValue.propKey] }}</div>
    </div>
    <div
      class="flex text-sm"
      :class="key % 2 ? 'bg-slate-300/20' : 'bg-secondary-content'"
    >
      <div v-if="revenues?.length == 1" class="w-1/2 p-2">Gehalt</div>
      <div v-else class="w-1/2 p-2">Gehälter</div>
      <div class="w-1/2 p-2">
        <div class="flex flex-col">
          <div v-for="(revenue,key) in revenues" :key="`${revenue.id}-${key}`" class="flex-1 w-full">
            <BaseEditInput
              class=""
              v-model="revenue.value"
              @leave="updateRevenue(revenue)"
              :input-extension="'€'"
            />
          </div>
        </div>
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

const user = computed(() => useUserStore().getUser);

const userId = computed(() => user.value["sub"]);

const revenues = ref<RevenueDto[]>();
const initialRevenues = { ...revenues.value };

const profilConfig: PropertyValue[] = [
  { label: "Id", propKey: "sub" },
  { label: "Vorname", propKey: "given_name" },
  { label: "Nachname", propKey: "family_name" },
  { label: "Email", propKey: "email" },
];

onMounted(async () => {
  loading.value = true;
  revenues.value = (
    await revenueClient.getRevenuesOfUserEndpoint(userId.value)
  ).revenues;
  loading.value = false;
});

const updateRevenue = async (revenue : RevenueDto) => {
  const oldVersion = useFindKey(initialRevenues, function (o: RevenueDto) {
    return o.id == revenue.id;
  }) as RevenueDto;
  const isDirt =
    oldVersion?.source !== revenue.source ||
    oldVersion?.value !== revenue.value;

  if (!isDirt) return;

  const request: UpdateRevenueRequest = {
    uRevenueDto: { id: revenue.id, value: revenue.value },
  };
  await revenueClient.updateRevenueEndpoint(request);
};
</script>

<style scoped></style>
