import { createRouter, createWebHistory, RouterOptions } from "vue-router";
import { basicRoutes } from "./routes/index";
import { setupRouterGuard } from "./guard/index";

export const router = createRouter({
  routes: [],
  history: createWebHistory("/"),
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRoute(app: any) {
  basicRoutes.forEach((route) => {
    !router.hasRoute(route.name) && router.addRoute(route);
  });
  app.use(router);
  setupRouterGuard(router);
}
