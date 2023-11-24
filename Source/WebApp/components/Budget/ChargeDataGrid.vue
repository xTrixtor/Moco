<template>
  <DxDataGrid
    :data-source="ordersData"
    key-expr="id"
    :show-borders="false"
    id="gridContainer"
  >
    <DxColumn data-field="chargeName" caption="Name">
      <DxRequiredRule message="Der Name wird benötigt" />
    </DxColumn>
    <DxColumn
      data-field="value"
      caption="Wert"
      cell-template="value"
      width="150"
    >
      <DxPatternRule
        :pattern="pattern"
        message="Bitte mit zwei Stellen nach dem Komma"
      />
      <DxRequiredRule message="Bitte gib den Wert an" />
    </DxColumn>
    <template #value="{ data }">
      <p>{{ data.value }} €</p>
    </template>

    <DxColumn
      data-field="catecory"
      caption="Kategory"
      cell-template="cellTemplate"
    >
      <DxLookup
        :data-source="catecories"
        value-expr="Value"
        display-expr="Text"
      />
    </DxColumn>
    <template #cellTemplate="{ data }">
      <p>{{ Catecory[+data.value] }}</p>
    </template>

    <DxSummary>
      <DxTotalItem
        column="Wert"
        summary-type="sum"
        display-format="Summe: {0} €"
        width="500px"
      >
        <DxValueFormat :precision="2" type="decimal" />
      </DxTotalItem>
    </DxSummary>
    <DxEditing
      :allow-adding="true"
      :allow-updating="true"
      :allow-deleting="true"
      mode="cell"
    />
    <DxScrolling mode="virtual" />
  </DxDataGrid>
</template>
<script setup lang="ts">
import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxFilterRow,
  DxHeaderFilter,
  DxGroupPanel,
  DxGrouping,
  DxScrolling,
  DxSummary,
  DxLookup,
  DxTotalItem,
  DxPatternRule,
  DxGroupItem,
  DxMasterDetail,
  DxStringLengthRule,
  DxRequiredRule,
  DxRangeRule,
  DxValueFormat,
} from "devextreme-vue/data-grid";
import {
  Catecory,
  ChargeDto,
  CreateChargeRequest,
  TimeInterval,
  UpdateChargeRequest,
} from "~/stores/apiClient";
import CustomStore from "devextreme/data/custom_store";
import { useUserStore } from "~/stores/userStore";
import { useApiStore } from "~/stores/apiStore";
interface ChargeDataGridProps {
  timeIntervalKey: number;
  charges: ChargeDto[];
}
const catecories = computed(() => CreateCategoriesForLookup);

const props = defineProps<ChargeDataGridProps>();

const pattern = /\d+\.\d{0,2}/gm;

const apiStore = useApiStore();
const ordersData = new CustomStore({
  load: async () =>
    await apiStore.ChargeClient.getChargesByInterval(props.timeIntervalKey),
  insert: async (value: ChargeDto) => await createCharge(value),
  remove: async (charge: ChargeDto) =>
    await apiStore.ChargeClient.deleteChargeEndpoint(charge.id),
  update: async (key, values) =>
    await apiStore.ChargeClient.updateChargeEndpoint({
      uChargeDto: {
        id: key.id,
        catecory: values.catecory ?? key.catecory,
        chargeName: values.chargeName ?? key.chargeName,
        timeInterval: key.timeInterval ?? key.timeInterval,
        value: values.value ?? key.value,
      },
    } as UpdateChargeRequest),
});

interface DxLookupData {
  Text: string;
  Value: number;
}

const CreateCategoriesForLookup = (): DxLookupData[] => {
  const allKeys = Object.keys(Catecory).filter((item) => {
    return !isNaN(Number(item));
  });

  return allKeys.map((key) => {
    return { Text: Catecory[+key], Value: +key } as DxLookupData;
  });
};

const createCharge = (value: ChargeDto) => {
  var newChargeDto: ChargeDto = {
    chargeName: value.chargeName,
    value: value.value,
    timeInterval: props.timeIntervalKey as TimeInterval,
    catecory: value.catecory,
  } as ChargeDto;
  const request = { chargeDto: newChargeDto } as CreateChargeRequest;
  return apiStore.ChargeClient.createChargeEndpoint(request);
};
</script>
<style>
#gridContainer {
  height: 390px;
}
</style>
