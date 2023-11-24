import DxPieChart, {
    DxSeries,
    DxLabel,
    DxLegend,
  } from 'devextreme-vue/pie-chart';
  import {
    DxDataGrid, DxColumn, DxPaging, DxPager,
  } from 'devextreme-vue/data-grid';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp
      // Pie
      .component("DxPieChart", DxPieChart)
      .component("DxSeries", DxSeries)
      .component("DxLabel", DxLabel)
      .component("DxLegend", DxLegend)
      
      .component("DxDataGrid", DxDataGrid)
      .component("DxColumn", DxColumn)
});