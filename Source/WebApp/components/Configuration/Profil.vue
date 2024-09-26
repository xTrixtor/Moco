<template>
  <div class="flex flex-col divide-y-2 text-highlight-text lg:p-10">
    <div class="flex bg-teal-500/50">
      <div class="w-1/2 p-2">Name</div>
      <div class="w-1/2 p-2">Wert</div>
    </div>
    <div
      v-for="(probValue, key) in profilConfig"
      :key="key"
      class="flex w-full"
    >
      <div
        class="w-1/2 max-w-[100px] lg:max-w-[50%] py-2 text-xs lg:text-sm pl-2"
      >
        {{ probValue.label }}
      </div>
      <div
        class="w-1/2 max-w-[100px] lg:max-w-[50%] py-2 text-xs lg:text-sm truncate"
      >
        {{ user[probValue.propKey] }}
      </div>
    </div>
    <div class="flex lg:text-base text-xs w-full">
      <div v-if="revenues?.length == 1" class="w-1/2 p-2 text-xs lg:text-sm">
        Gehalt
      </div>
      <div v-else class="w-1/2 p-2 text-xs lg:text-sm">Gehälter</div>
      <div class="w-1/2 p-2">
        <div class="flex flex-col">
          <div
            v-for="(revenue, key) in revenues"
            :key="`${revenue.id}-${key}`"
            class="flex-1 w-full text-xs lg:text-sm"
          >
            <div class="flex flex-1 items-center gap-2">
              <p>{{ revenue.source }}:</p>
              <BaseEditInput
                class="text-primary"
                v-model="revenue.value"
                @leave="updateRevenue(revenue)"
                :input-extension="'€'"
              />
            </div>
          </div>
          <div>
            <Icon
              name="gridicons:add-outline"
              class="text-2xl duration-500 text-highlight-text"
              @click="() => showModal = !showModal"
            />
            <AddRevenueModal v-model="showModal" />
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
import AddRevenueModal from "./AddRevenueModal.vue";

interface PropertyValue {
  propKey: String;
  label: String;
}

const revenueClient = useApiStore().RevenueClient;
const loading = ref(false);

const user = computed(() => useUserStore().getUser);

const userId = computed(() => user.value["sub"]);

const showModal = ref(false);

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

const updateRevenue = async (revenue: RevenueDto) => {
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
