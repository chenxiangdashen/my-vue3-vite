import { h } from "vue";
import { NIcon } from "naive-ui";

export function renderIcon(icon, props = { size: 12 }) {
  return () => h(NIcon, { ...props }, { default: () => h(icon) });
}
