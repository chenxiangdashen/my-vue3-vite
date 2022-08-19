import { Router } from "vue-router";
const baseTitle = import.meta.env.VITE_APP_TITLE;
export function createPageTitleGuard(router: Router) {
  router.afterEach((to, from) => {
    const pageTitle: string = to.meta?.title as string;
    if (pageTitle) {
      document.title = `${pageTitle} | ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }
  });
}
