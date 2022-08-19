import { defineStore } from "pinia";
import { asyncRoutes, basicRoutes } from "../../router/routes/index";
import Error404 from "@/views/error-page/404.vue";
import { MenuPermission, ResponsePermission } from "../types/types";

const modules = import.meta.glob("@/views/**/*.vue");

function hasPermission(route, role) {
  const routeRole = route.meta?.role ? route.meta.role : [];
  if (!role.length || !routeRole.length) {
    return false;
  }
  return role.some((item) => routeRole.includes(item));
}

function filterAsyncRoutes(routes = [], role) {
  const ret = [];
  routes.forEach((route) => {
    const curRoute = {
      ...route,
      children: [],
    };
    if (route.children && route.children.length) {
      curRoute.children = filterAsyncRoutes(route.children, role);
    } else {
      Reflect.deleteProperty(curRoute, "children");
    }
    ret.push(curRoute);
  });
  return ret;
}

function sortList(sourceList) {
  const len = sourceList.length;
  for (let i = 0; i < len; i += 1) {
    for (let j = 0; j < len - 1 - i; j += 1) {
      if (sourceList[j].id > sourceList[j + 1].id) {
        const temp = sourceList[j + 1];
        sourceList[j + 1] = sourceList[j];
        sourceList[j] = temp;
      }
    }
  }
  return sourceList;
}

function transferUrlToPath(srcList) {
  return srcList.map((item) => ({
    ...item,
    path: item.url,
  }));
}

/**
 *
 * @param permissions
 * @returns
 */
export function getPermissionTree(permissions: ResponsePermission[]) {
  if (!permissions || permissions.length === 0) {
    return [];
  }
  permissions = sortList(permissions);
  permissions = transferUrlToPath(permissions);
  const parents: ResponsePermission[] = [];
  for (let i = 0; i < permissions.length; i += 1) {
    const curPermission: ResponsePermission = permissions[i];
    permissions[i].id = curPermission.permissionId;
    if (curPermission.parentId === "0") {
      parents.push(curPermission);
    }
  }
  return createTreeList(parents, permissions);
}

function createTreeList(
  parentList: ResponsePermission[],
  fullList: ResponsePermission[]
) {
  if (!parentList || parentList.length === 0) {
    return null;
  }
  const treeList = [];
  for (let i = 0; i < parentList.length; i += 1) {
    treeList.push(parseSingleParent(parentList[i], fullList));
  }
  return treeList;
}

function parseSingleParent(parent, fullList) {
  const parentMap = parseNodeMap(parent, false);
  const child = [];
  for (let j = 0; j < fullList.length; j += 1) {
    if (fullList[j].parentId === parent.id && fullList[j].type === "1") {
      let childMap;
      if (isTreeLeaf(fullList[j], fullList)) {
        childMap = parseNodeMap(fullList[j], true);
      } else {
        // fullList[j].component = () => import('@/views/examples/table/index.vue')
        childMap = parseNodeMap(fullList[j], false);
        childMap.children = parseSingleParent(childMap, fullList).children;
      }
      child.push(childMap);
    }
  }
  parentMap.children = child;
  return parentMap;
}

function parseNodeMap(node, child) {
  let nodeMap: any = {};
  if (node.parentId === "0") {
    nodeMap.component = () => import("@/layout/index.vue");
  }
  if (child !== true) {
    nodeMap = {
      ...nodeMap,
      id: node.id,
      parentId: node.parentId,
      name: node.path.toUpperCase(),
      icon: node.icon,
      path: node.path,
      type: node.type,
      meta: { title: node.permissionName },
      children: [],
      // component: node.component,
    };
  } else {
    nodeMap = {
      ...nodeMap,
      id: node.id,
      parentId: node.parentId,
      meta: { title: node.permissionName },
      name: node.path.toUpperCase(),
      icon: node.icon,
      path: node.path,
      type: node.type,
      // component: () => import('@/views/examples/table/post/PostCreate.vue'),
    };
  }
  return nodeMap;
}

function isTreeLeaf(node, fullList) {
  for (let i = 0; i < fullList.length; i += 1) {
    if (fullList[i].parentId === node.id) {
      return false;
    }
  }
  return true;
}

/* eslint no-useless-escape:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

function formatter(data = [], parentPath = "/") {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }

    const p = `../../views${path}/index.vue`;
    // console.log(p)
    const result = {
      ...item,
      path,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`);
    } else {
      result.component = modules[p] ? modules[p] : Error404;
    }
    return result;
  });
}

export const usePermissionStore = defineStore("permission", {
  state() {
    return {
      accessRoutes: [],
    };
  },
  getters: {
    routes() {
      return basicRoutes.concat(this.accessRoutes);
    },
    menus(): MenuPermission[] {
      return this.routes.filter(
        (route: MenuPermission) => route.name && !route.isHidden
      );
    },
  },
  actions: {
    generateRoutes(role: ResponsePermission[] = []) {
      //   const accessRoutes = filterAsyncRoutes(asyncRoutes, role);
      // console.log(getPermissionTree(role))
      // for (const path in modules) {
      //   console.log(path, modules[path])
      // }
      // console.log(()=>import('../../views/examples/table/post/PostCreate.vue'))
      const routers = formatter(getPermissionTree(role));
      this.accessRoutes = routers;
      return routers;
    },
  },
});
