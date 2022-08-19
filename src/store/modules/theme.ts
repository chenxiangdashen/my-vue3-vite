import { defineStore } from "pinia";
import { themeSettings } from "../../settings/index";
export const useThemeStore = defineStore("theme", {
  state() {
    return themeSettings;
  },
  getters: {
    theme() {
      return this.naiveThemeOverrides;
    },
  },
  actions: {
    setTabVisible(visible) {
      this.tags.visible = visible;
    },
  },
});
