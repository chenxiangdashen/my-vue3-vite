<template>
  <n-menu
    class="side-menu"
    accordion
    :options="menuOptions"
    :expand-icon="expandIcon"
    :value="
      (currentRoute.meta && currentRoute.meta.activeMenu) || currentRoute.name
    "
    @update:value="handleMenuSelect"
  />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed, h } from "vue";
import { usePermissionStore } from "@/store/modules/permission";

import { IconCircle, CaretDownOutline } from "@/components/AppIcons";

import { isExternal } from "@/utils/is";
import { useAppStore } from "@/store/modules/app";
import { ISideMenu, MenuPermission } from "@/store/types/types";
import { MenuOption, NIcon } from "naive-ui";
import { router } from "@/router";

const expandIcon = function () {
  return h(NIcon, null, { default: () => h(CaretDownOutline) });
};

// const router = useRouter();
const permissionStore = usePermissionStore();
const appStore = useAppStore();
const { currentRoute } = useRouter();

const menuOptions = computed(() => {
  return permissionStore.menus
    .map((item: MenuPermission) => getMenuItem(item))
    .sort((a: ISideMenu, b: ISideMenu) => a.index - b.index);
});

function resolvePath(basePath: string, path: string) {
  if (isExternal(path)) return path;
  return (
    "/" +
    [basePath, path]
      .filter((path) => !!path && path !== "/")
      .map((path) => path.replace(/(^\/)|(\/$)/g, ""))
      .join("/")
  );
}

function getMenuItem(route: MenuPermission, basePath: string = ""): ISideMenu {
  let menuItem: ISideMenu = {
    label: (route.meta && route.meta.title) || route.name,
    key: route.name,
    path: route.path,
    index: route.meta?.index || 0,
    // icon: () => h("div", IconCircle),
  };

  const visibleChildren = route.children
    ? route.children.filter((item) => item.name && !item.isHidden)
    : [];

  if (!visibleChildren.length) return menuItem;

  if (visibleChildren.length === 1) {
    // 单个子路由处理
    const singleRoute = visibleChildren[0];
    menuItem = {
      label: singleRoute.meta?.title || singleRoute.name,
      key: singleRoute.name,
      path: singleRoute.path,
      index: menuItem.index,
    };
    const visibleItems = singleRoute.children
      ? singleRoute.children.filter((item) => item.name && !item.isHidden)
      : [];

    if (visibleItems.length === 1) {
      menuItem = getMenuItem(visibleItems[0], menuItem.path);
    } else if (visibleItems.length > 1) {
      menuItem.children = visibleItems
        .map((item) => getMenuItem(item, menuItem.path))
        .sort((a, b) => a.index - b.index);
    }
  } else {
    menuItem.children = visibleChildren
      .map((item) => getMenuItem(item, menuItem.path))
      .sort((a, b) => a.index - b.index);
  }

  return menuItem;
}

function handleMenuSelect(key: string, item: any) {
  if (isExternal(item.path)) {
    window.open(item.path);
  } else {
    if (
      item.path === currentRoute.value.path &&
      !currentRoute.value.meta?.keepAlive
    ) {
      appStore.reloadPage();
    } else {
      router.push(item.path);
    }
  }
}
</script>

<style lang="scss">
.n-menu {
  margin-top: 10px;
  // padding-left: 10px;
  .n-menu-item-content {
    &::before {
      left: 0;
      right: 0;
      border-radius: 0;
      background-color: unset !important;
    }
    &:hover,
    &.n-menu-item-content--selected {
      border-radius: 0 !important;

      &::before {
        border-right: 3px solid $primaryColor;
        background-color: #16243a;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0%,
          rgba($primaryColor, 0.3) 100%
        );
      }
    }
  }

  .n-menu-item-content-header {
    font-size: 14px;
    font-weight: bold;
  }

  .n-submenu-children {
    .n-menu-item-content-header {
      font-size: 14px;
      font-weight: normal;
      position: relative;
      overflow: visible !important;
    }
  }
}
</style>
