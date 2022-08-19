import "./styles/reset.css";
import "./styles/index.scss";
import "uno.css";

import { createApp } from "vue";
import { setupStore } from "./store";
import App from "./App.vue";
import { setupRoute } from "./router";

function setupApp() {
  const app = createApp(App);
  setupStore(app);
  setupRoute(app);
  app.mount("#app");
}

setupApp();
