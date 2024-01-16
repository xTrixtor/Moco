import DxPieChart from "devextreme-vue/pie-chart";
import {
  DxDataGrid,
  DxColumn,
} from "devextreme-vue/data-grid";
import {
  DxChart,
  DxSeries,
  DxCommonSeriesSettings,
  DxLabel,
  DxFormat,
  DxLegend,
} from "devextreme-vue/chart";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp
    // Pie
    .component("DxPieChart", DxPieChart)
    .component("DxSeries", DxSeries)
    .component("DxLabel", DxLabel)
    .component("DxLegend", DxLegend)

    .component("DxDataGrid", DxDataGrid)
    .component("DxColumn", DxColumn)

    .component("DxChart", DxChart)
    .component("DxFormat", DxFormat)
    .component("DxCommonSeriesSettings", DxCommonSeriesSettings)

});
