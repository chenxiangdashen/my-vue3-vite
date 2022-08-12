import "@/styles/reset.css";
import "@/styles/index.scss";
import "uno.css";

import { createApp } from "vue";
import { setupStore } from "./store";
import App from "./App.vue";

function setupApp() {
  const app = createApp(App);
  setupStore(app);
  app.mount("#app");
}

setupApp();
