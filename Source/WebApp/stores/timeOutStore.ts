import { defineStore } from "pinia";
import { useUserStore } from "./userStore";

export const useTimeoutStore = defineStore("timeout", {
  state: () => {
    const defaultTime = 29 * 60 * 1000;
    const time = defaultTime;
    const interval = 1000;
    const text = "";
    const intervalId = ref(0);

    return {
      time,
      interval,
      text,
      intervalId,
      defaultTime,
    };
  },
  actions: {
    startTimer() {
      this.intervalId = +setInterval(() => {
        this.time = this.time - this.interval;
        if (this.time <= 0) {
          clearInterval(this.intervalId);
          useUserStore().logout();
          location.reload();
        }
        const date = new Date(this.time);
        this.text = useDateFormat(date, "mm:ss").value;
      }, this.interval);
    },
    clearTimer() {
      this.time = this.defaultTime;
      this.text = "";
      clearInterval(this.intervalId);
    },
  },
  getters: {},
});
