import { useInspectionStore } from "~/stores/costInspectionStore";

export default defineNuxtRouteMiddleware((to, from) => {
  if (from.path == "/costInspection") {
        useInspectionStore().selectedDate = new Date()
  }
});
