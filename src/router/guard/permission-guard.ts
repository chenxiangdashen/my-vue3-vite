import { Router } from "vue-router";
import { useUserStore } from "../../store/modules/user";
import { getToken } from "../../utils/token";
import { usePermissionStore } from "../../store/modules/permission";
import { NOT_FOUND_ROUTE } from "../routes";
import { MenuPermission } from "../../store/types/types";

const WHITE_LIST = ["/login", "/redirect"];
export function createPermissionGuard(router: Router) {
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();
  router.beforeEach(async (to, from, next) => {
    const token = getToken();
    if (token) {
      if (to.path === "/login") {
        next("/");
      } else {
        if (userStore.userId) {
          next();
        } else {
          try {
            await userStore.getUserInfo();
            const accessRoutes: MenuPermission[] =
              permissionStore.generateRoutes(userStore.PERMISSION);
            accessRoutes.forEach((route) => {
              !router.hasRoute(route.name) && router.addRoute(route);
            });
            router.addRoute(NOT_FOUND_ROUTE);
            next({ ...to, replace: true });
          } catch (e) {}
        }
      }
    } else {
      if (WHITE_LIST.includes(to.path)) {
        next();
      } else {
        next({ path: "/login", query: { ...to.query, redirect: to.path } });
      }
    }
  });
}
